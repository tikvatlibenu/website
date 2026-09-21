'use client'

import { useMemo, useState } from 'react'
import { TikvatRoot, Container, Heading, Paragraph, Eyebrow, Badge, Divider } from '@/ds'
import { previews } from '@/ds/previews'
import catalog from '@/ds/catalog.json'

/** Human labels for the manifest's group slugs, in the order they read best. */
const GROUP_ORDER: Array<[string, string]> = [
  ['foundations', 'יסודות'],
  ['typography', 'טיפוגרפיה'],
  ['actions', 'פעולות'],
  ['forms', 'טפסים'],
  ['cards', 'כרטיסים'],
  ['sections', 'מקטעים'],
  ['navigation', 'ניווט'],
  ['data-display', 'הצגת נתונים'],
  ['donation', 'תרומות'],
  ['feedback', 'משוב'],
  ['disclosure', 'תוכן מתקפל'],
  ['media', 'מדיה'],
  ['brand', 'מותג'],
  ['icons', 'אייקונים'],
  ['utilities', 'כלי עזר'],
]

type Entry = {
  name: string
  group: string
  description: string
  /** How wide the stories want to be, taken from the export's own variant grid. */
  mode: 'grid' | 'column' | 'single'
  /** The story the export shows first. */
  primary: string | null
}

export default function DesignSystemPage() {
  const entries = catalog as Entry[]
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matches = needle
      ? entries.filter(
          (e) =>
            e.name.toLowerCase().includes(needle) || e.description.toLowerCase().includes(needle),
        )
      : entries

    return GROUP_ORDER.map(([slug, label]) => ({
      slug,
      label,
      items: matches.filter((e) => e.group === slug),
    })).filter((g) => g.items.length > 0)
  }, [entries, query])

  const shown = groups.reduce((total, g) => total + g.items.length, 0)

  return (
    <TikvatRoot>
      <header
        style={{
          background: 'var(--tl-color-bg-soft)',
          borderBlockEnd: '1px solid var(--tl-color-border)',
          paddingBlock: 'var(--tl-space-12)',
        }}
      >
        <Container>
          <Eyebrow>מערכת העיצוב</Eyebrow>
          <Heading level={1} size="h1">
            תקוות ליבנו — ספריית הרכיבים
          </Heading>
          <Paragraph size="lead">
            כל {entries.length} הרכיבים של <span dir="ltr">@tikvat-libenu/ui</span>, מוצגים
            בדפדפן מתוך הקוד עצמו. זהו עותק חי — לא צילום מסך.
          </Paragraph>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--tl-space-3)',
              marginBlockStart: 'var(--tl-space-6)',
            }}
          >
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="חיפוש רכיב…"
              aria-label="חיפוש רכיב"
              style={{
                font: 'inherit',
                color: 'inherit',
                paddingBlock: 'var(--tl-space-3)',
                paddingInline: 'var(--tl-space-4)',
                borderRadius: 'var(--tl-radius-pill)',
                border: '1px solid var(--tl-color-border-input)',
                background: 'var(--tl-color-bg)',
                minInlineSize: 260,
              }}
            />
            <Badge tone="teal">{shown} רכיבים</Badge>
          </div>
        </Container>
      </header>

      <main style={{ paddingBlock: 'var(--tl-space-12)' }}>
        {groups.length === 0 && (
          <Container>
            <Paragraph>לא נמצאו רכיבים תואמים.</Paragraph>
          </Container>
        )}

        {groups.map((group) => (
          <section key={group.slug} style={{ marginBlockEnd: 'var(--tl-space-16)' }}>
            <Container>
              <Heading level={2} size="h3">
                {group.label}
              </Heading>
              <Divider />
            </Container>

            {group.items.map((item) => (
              <ComponentSection key={item.name} entry={item} />
            ))}
          </section>
        ))}
      </main>
    </TikvatRoot>
  )
}

/** One component: its description, then every example story the export ships. */
function ComponentSection({ entry }: { entry: Entry }) {
  const stories = previews[entry.name] ?? {}
  const names = Object.keys(stories).filter(
    (key) => typeof stories[key] === 'function' && /^[A-Z]/.test(key),
  )

  // The export's own primary story leads, as it does upstream.
  if (entry.primary) {
    const at = names.indexOf(entry.primary)
    if (at > 0) names.splice(0, 0, ...names.splice(at, 1))
  }

  // Page-width components (Hero, SiteHeader, Section, Gallery…) only lay out
  // correctly across the full width; tiling them in columns is what made them
  // look unresponsive. Small components still tile.
  const tiled = entry.mode === 'grid'

  const grid = (
    <div
      style={{
        display: 'grid',
        gap: 'var(--tl-space-4)',
        gridTemplateColumns: tiled ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
        marginBlockStart: 'var(--tl-space-5)',
      }}
    >
      {names.map((story) => (
        <Story key={story} name={story} render={stories[story]} />
      ))}
    </div>
  )

  return (
    <article style={{ marginBlockStart: 'var(--tl-space-10)' }}>
      <Container>
        <Heading level={3} size="h4">
          <span dir="ltr">{entry.name}</span>
        </Heading>
        <Paragraph size="sm" tone="secondary">
          {/* The upstream descriptions are English; without an LTR island their
              trailing full stop jumps to the head of the line on this RTL page. */}
          <span dir="ltr" style={{ display: 'inline-block', textAlign: 'start' }}>
            {entry.description}
          </span>
        </Paragraph>
        {tiled && grid}
      </Container>

      {/* A page-width component is shown at page width: these lay themselves
          out against the viewport, so a 1200px wrapper would misrepresent them. */}
      {!tiled && <div style={{ paddingInline: 'var(--tl-gutter)' }}>{grid}</div>}
    </article>
  )
}

function Story({ name, render }: { name: string; render: () => React.ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid var(--tl-color-border)',
        borderRadius: 'var(--tl-radius-lg)',
        padding: 'var(--tl-space-5)',
        background: 'var(--tl-color-bg)',
        minInlineSize: 0,
        overflow: 'hidden',
        position: 'relative',
        // Dialog and FloatingContact are position:fixed. Upstream renders one
        // component per page, where that is correct; here every story shares a
        // page, so each cell becomes a containing block (the same
        // translateZ(0) the export's own preview harness uses) to stop a modal
        // veil covering the whole reference.
        transform: 'translateZ(0)',
      }}
    >
      <p
        dir="ltr"
        style={{
          margin: 0,
          marginBlockEnd: 'var(--tl-space-4)',
          textAlign: 'start',
          font: 'inherit',
          fontSize: 'var(--tl-font-size-xs)',
          fontWeight: 'var(--tl-font-weight-semibold)',
          letterSpacing: '.04em',
          textTransform: 'uppercase',
          color: 'var(--tl-color-text-muted)',
        }}
      >
        {name}
      </p>
      {render()}
    </div>
  )
}
