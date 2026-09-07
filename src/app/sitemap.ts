import type { MetadataRoute } from 'next'
import { locales, localeHreflang } from '@/i18n/config'
import { getAllCampaignSlugs } from '@/lib/payload'
import { getServerUrl } from '@/lib/url'

const STATIC_PATHS = ['', '/campaigns', '/about', '/faq', '/donate', '/contact'] as const

/**
 * Every path is emitted once per locale, each entry carrying the alternates
 * for the other locale so Google can pair the translations.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getServerUrl()
  const campaigns = await getAllCampaignSlugs()

  const alternatesFor = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((locale) => [localeHreflang[locale], `${base}/${locale}${path}`]),
    ),
  })

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? ('daily' as const) : ('weekly' as const),
      priority: path === '' ? 1 : path === '/donate' ? 0.9 : 0.7,
      alternates: alternatesFor(path),
    })),
  )

  const campaignEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    campaigns.map(({ slug, updatedAt }) => ({
      url: `${base}/${locale}/campaigns/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: alternatesFor(`/campaigns/${slug}`),
    })),
  )

  return [...staticEntries, ...campaignEntries]
}
