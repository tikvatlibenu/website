/**
 * Runs the Payload CLI against the session pooler.
 *
 * The app and the build use DATABASE_URI, which points at Supabase's
 * transaction pooler (port 6543) so that prerendering and serverless functions
 * cannot exhaust the connection budget. Migrations cannot run there: they need
 * a real session, which only the session pooler (port 5432) provides.
 *
 * This swaps DATABASE_URI for DATABASE_URI_SESSION and forwards every argument
 * to `payload`, so:
 *
 *   pnpm migrate                 -> payload migrate
 *   pnpm migrate status          -> payload migrate:status
 *   pnpm migrate:create <name>   -> payload migrate:create <name>
 *
 * If DATABASE_URI_SESSION is unset it falls back to DATABASE_URI, which is
 * correct for a plain local Postgres that has no pooler in front of it.
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { config as loadEnv } from 'dotenv'

loadEnv({ path: ['.env.local', '.env'], quiet: true })

const sessionUri = process.env.DATABASE_URI_SESSION || process.env.DATABASE_URI

if (!sessionUri) {
  console.error('Neither DATABASE_URI_SESSION nor DATABASE_URI is set. Check .env.local.')
  process.exit(1)
}

const args = process.argv.slice(2)
const command = args.length > 0 ? args : ['migrate']

// The local binary, since node_modules/.bin is not on PATH when this script is
// run directly rather than through a package manager.
const payloadBin = path.join(process.cwd(), 'node_modules', '.bin', 'payload')

const child = spawn(`"${payloadBin}"`, command, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    DATABASE_URI: sessionUri,
    NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ''} --no-deprecation`.trim(),
  },
})

child.on('exit', (code) => process.exit(code ?? 1))
