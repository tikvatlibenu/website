import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { en } from '@payloadcms/translations/languages/en'
import { he } from '@payloadcms/translations/languages/he'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Campaigns } from './collections/Campaigns'
import { Faqs } from './collections/Faqs'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { AboutPage } from './globals/AboutPage'

/**
 * Origins allowed to make authenticated requests to Payload.
 *
 * Payload drops the auth cookie on any request whose Origin header is not in
 * this list. Page loads send no Origin, so the admin still looks logged in, but
 * every save is a POST that does send one — so a missing entry shows up as
 * "You are not allowed to perform this action" on save, for every user.
 *
 * Vercel's system variables are included so the production domain, preview
 * deployments and branch URLs work without hand-maintaining a list.
 */
const trustedOrigins = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  ...(process.env.ADDITIONAL_TRUSTED_ORIGINS?.split(',') ?? []),
  process.env.NODE_ENV !== 'production' && 'http://localhost:3000',
]
  .filter((origin): origin is string => Boolean(origin))
  .map((origin) => origin.trim().replace(/\/$/, ''))

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Supabase Storage speaks S3. Without credentials we fall back to local disk so
// the project still runs for local development.
const hasS3 = Boolean(
  process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY,
)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Tikvatlibenu',
    },
    components: {
      // Reference page for the component library, linked from the admin nav so
      // editors and the client can reach it without hunting for the URL.
      afterNavLinks: ['/components/admin/DesignSystemLink#DesignSystemLink'],
    },
  },
  collections: [Campaigns, Faqs, Media, ContactSubmissions, Users],
  globals: [SiteSettings, Navigation, AboutPage],
  // The admin interface itself is bilingual. Each user picks their language
  // from their account page; Hebrew is the default, matching the site.
  i18n: {
    supportedLanguages: { he, en },
    fallbackLanguage: 'he',
  },
  localization: {
    locales: [
      { label: { he: 'עברית', en: 'Hebrew' }, code: 'he', rtl: true },
      { label: { he: 'אנגלית', en: 'English' }, code: 'en' },
    ],
    defaultLocale: 'he',
    fallback: true,
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      // Supabase's session pooler allows 15 client connections for the whole
      // project, shared by every environment at once. node-postgres defaults to
      // 10 per pool and holds them idle, so one running dev server plus a
      // production build exhausts the budget and the build dies mid-prerender
      // with (EMAXCONNSESSION). Keep each instance's share small, and hand
      // idle connections back quickly so builds and serverless functions do
      // not sit on them.
      max: Number(process.env.DATABASE_POOL_MAX ?? 4),
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 15_000,
    },
    // Payload's dev-mode auto-push rewrites the live schema on every `next dev`
    // and leaves a 'dev' row in payload_migrations that makes later `migrate`
    // runs warn about data loss. Schema changes go through migrations instead:
    //   pnpm payload migrate:create <name> && pnpm payload migrate
    // Set PAYLOAD_DB_PUSH=true for a throwaway local database if you want the
    // old behaviour while iterating on collections.
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  cors: trustedOrigins,
  csrf: trustedOrigins,
  plugins: hasS3
    ? [
        s3Storage({
          collections: {
            media: {
              prefix: 'media',
            },
          },
          bucket: process.env.S3_BUCKET as string,
          config: {
            forcePathStyle: true,
            region: process.env.S3_REGION || 'us-east-1',
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
            },
          },
        }),
      ]
    : [],
})
