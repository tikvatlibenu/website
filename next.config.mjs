import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next 16 rejects local image URLs that carry a query string unless it is
    // listed here. Payload's storage plugin serves files as
    // /api/media/file/<name>?prefix=media, so without this entry every page
    // that renders an uploaded image fails. The query is matched exactly
    // rather than left open, so the optimizer cannot be pointed at arbitrary
    // query variants.
    localPatterns: [
      { pathname: '/**', search: '' },
      { pathname: '/api/media/file/**', search: '?prefix=media' },
    ],
    remotePatterns: [
      // Supabase storage public bucket
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL
        ? [
            {
              protocol: 'https',
              hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
            },
          ]
        : []),
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
