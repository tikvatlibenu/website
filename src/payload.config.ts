import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Campaigns } from './collections/Campaigns'
import { Faqs } from './collections/Faqs'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { AboutPage } from './globals/AboutPage'

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
  },
  collections: [Campaigns, Faqs, Media, ContactSubmissions, Users],
  globals: [SiteSettings, Navigation, AboutPage],
  localization: {
    locales: [
      { label: 'עברית', code: 'he', rtl: true },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'he',
    fallback: true,
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
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
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
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
