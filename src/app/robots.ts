import type { MetadataRoute } from 'next'
import { getServerUrl } from '@/lib/url'

export default function robots(): MetadataRoute.Robots {
  const base = getServerUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/design-system'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
