import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
