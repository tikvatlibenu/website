/**
 * Converts a Claude Design export of @tikvat-libenu/ui into modules this app
 * can import.
 *
 * The export ships the library as `_ds_bundle.js`: a browser IIFE that reads
 * React off `window` and assigns itself to `window.TikvatUI`. Loading that with
 * a script tag would mean a second React instance, no server rendering and no
 * types. Instead this rewrites the two global seams into real module
 * imports/exports, so components import like any other React code.
 *
 * The per-component example stories in `_preview/` get the same treatment, and
 * the `.d.ts` files are concatenated into one typed entry point.
 *
 *   node scripts/convert-design-system.mjs <path-to-extracted-export>
 *
 * Re-run it against a newer export to update; everything under src/ds is
 * generated and should not be hand-edited.
 */
import { mkdir, readdir, readFile, rm, writeFile, cp } from 'node:fs/promises'
import path from 'node:path'

const source = process.argv[2]
if (!source) {
  console.error('usage: node scripts/convert-design-system.mjs <path-to-extracted-export>')
  process.exit(1)
}

const out = path.join(process.cwd(), 'src', 'ds')

const header = `/*
 * Generated from the Tikvat Libenu design-system export (@tikvat-libenu/ui@0.1.0).
 * Do not edit by hand — re-run scripts/convert-design-system.mjs.
 */
`

/*
 * The upstream shim does `module.exports = R; module.exports.jsx = jsx`, i.e. it
 * mutates whatever React object it is handed. A live ES module namespace is
 * frozen, so it gets a shallow mutable copy instead. `default` is folded in for
 * the CommonJS interop shape Next may hand back.
 */
const REACT_SHIM = 'var R = Object.assign({}, __React.default, __React);'

/** Replace an exact, expected snippet, failing loudly if the export changed shape. */
function replaceOnce(text, find, replaceWith, what) {
  const count = text.split(find).length - 1
  if (count !== 1) throw new Error(`${what}: expected 1 occurrence of ${JSON.stringify(find)}, found ${count}`)
  return text.replace(find, replaceWith)
}

function assertNoGlobals(text, what) {
  if (text.includes('window.')) {
    const sample = text.match(/.{40}window\..{40}/)?.[0]
    throw new Error(`${what}: unconverted window reference near: ${sample}`)
  }
}

await rm(out, { recursive: true, force: true })
await mkdir(path.join(out, 'previews'), { recursive: true })

// Stylesheets, tokens, fonts and docs travel verbatim.
for (const asset of ['tokens', 'fonts', 'guidelines']) {
  await cp(path.join(source, asset), path.join(out, asset), { recursive: true })
}
for (const [from, to] of [
  ['_ds_bundle.css', '_ds_bundle.css'],
  ['styles.css', 'styles.css'],
  ['_ds_manifest.json', 'manifest.json'],
  ['README.md', 'DESIGN-SYSTEM.md'],
]) {
  await cp(path.join(source, from), path.join(out, to))
}

// ---- the library bundle --------------------------------------------------
let bundle = await readFile(path.join(source, '_ds_bundle.js'), 'utf8')
bundle = bundle.slice(bundle.indexOf('*/') + 2).trimStart() // drop the @ds-bundle header
bundle = replaceOnce(bundle, 'var R = window.React;', REACT_SHIM, 'bundle react shim')
bundle = replaceOnce(
  bundle,
  'window.TikvatUI=TikvatUI.__dsMainNs?Object.assign({},TikvatUI,TikvatUI.__dsMainNs,{__dsMainNs:undefined}):TikvatUI;',
  'const __ns = TikvatUI.__dsMainNs\n  ? Object.assign({}, TikvatUI, TikvatUI.__dsMainNs, { __dsMainNs: undefined })\n  : TikvatUI;\nexport default __ns;',
  'bundle namespace export',
)
assertNoGlobals(bundle, 'bundle')
await writeFile(
  path.join(out, 'tikvat-ui.mjs'),
  `${header}import * as __React from 'react';\n\n${bundle}`,
)

// ---- the example stories -------------------------------------------------
const previews = (await readdir(path.join(source, '_preview')))
  .filter((f) => f.endsWith('.js'))
  .sort()

for (const file of previews) {
  const name = file.replace(/\.js$/, '')
  let code = await readFile(path.join(source, '_preview', file), 'utf8')

  code = replaceOnce(code, 'var __dsPreview = (() => {', 'const __dsPreview = (() => {', `${name} preamble`)
  code = replaceOnce(code, 'var R = window.React;', REACT_SHIM, `${name} react shim`)
  code = replaceOnce(code, 'module.exports = window.TikvatUI;', 'module.exports = __TikvatUI;', `${name} ds shim`)
  code = replaceOnce(code, 'var g = window.TikvatUI;', 'var g = __TikvatUI;', `${name} ds namespace`)
  assertNoGlobals(code, name)

  await writeFile(
    path.join(out, 'previews', `${name}.mjs`),
    `${header}import * as __React from 'react';\nimport __TikvatUI from '../tikvat-ui.mjs';\n\n` +
      `${code.trimEnd().replace(/;$/, '')};\nexport default __dsPreview;\n`,
  )
}

// ---- types ---------------------------------------------------------------
// Each component ships a self-contained .d.ts whose interfaces are uniquely
// named, so they concatenate into one declaration file.
const groups = await readdir(path.join(source, 'components'), { withFileTypes: true })
const declarations = []
const componentNames = []

for (const group of groups.filter((g) => g.isDirectory())) {
  const dir = path.join(source, 'components', group.name)
  for (const comp of (await readdir(dir, { withFileTypes: true })).filter((c) => c.isDirectory())) {
    const dts = path.join(dir, comp.name, `${comp.name}.d.ts`)
    let body = await readFile(dts, 'utf8').catch(() => null)
    if (body === null) continue
    body = body.replace(/^\s*import \* as React from 'react';?\s*/m, '').trim()
    declarations.push(body)
    componentNames.push(comp.name)
  }
}
componentNames.sort()

await writeFile(
  path.join(out, 'components.d.ts'),
  `${header}import * as React from 'react';\n\n${declarations.join('\n\n')}\n`,
)

// A typed entry point: the runtime values come from the bundle, the types from
// the declarations above.
const index = `${header}
import TikvatUI from './tikvat-ui.mjs'
import type * as DS from './components'

export type {
${componentNames.map((n) => `  ${n}Props,`).join('\n')}
} from './components'

${componentNames.map((n) => `export const ${n}: typeof DS.${n} = TikvatUI.${n}`).join('\n')}

export default TikvatUI
`
await writeFile(path.join(out, 'index.ts'), index)

// A static registry, so the reference page can import every story set without
// dynamic imports (which Turbopack cannot statically analyse here).
const previewNames = previews.map((f) => f.replace(/\.js$/, ''))
await writeFile(
  path.join(out, 'previews', 'index.ts'),
  `${header}
import type { ReactNode } from 'react'

${previewNames.map((n) => `import ${n} from './${n}.mjs'`).join('\n')}

/** Example stories per component, keyed by component name. */
export const previews: Record<string, Record<string, () => ReactNode>> = {
${previewNames.map((n) => `  ${n},`).join('\n')}
}
`,
)

// The README carries a one-line description per component, under its group.
// Lift them out so the reference page can caption each section.
const readme = await readFile(path.join(source, 'README.md'), 'utf8')
const descriptions = {}
for (const line of readme.split('\n')) {
  const m = line.match(/^- `([A-Za-z]+)` — (.+)$/)
  if (m) descriptions[m[1]] = m[2].trim()
}

const groupOf = {}
const manifest = JSON.parse(await readFile(path.join(source, '_ds_manifest.json'), 'utf8'))
for (const c of manifest.components ?? []) {
  const segments = (c.sourcePath ?? '').split('/')
  if (segments.length > 1) groupOf[c.name] = segments[1]
}

await writeFile(
  path.join(out, 'catalog.json'),
  JSON.stringify(
    previewNames.map((name) => ({
      name,
      group: groupOf[name] ?? 'other',
      description: descriptions[name] ?? '',
    })),
    null,
    2,
  ) + '\n',
)

console.log(`converted ${previews.length} preview modules and ${componentNames.length} component types`)
