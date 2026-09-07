import 'server-only'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/config'
import type { AboutPage, Campaign, Faq, Navigation, SiteSetting } from '@/payload-types'

/**
 * All content is read through the Payload local API so server components hit
 * the database directly instead of round-tripping through REST.
 */
const client = cache(async () => getPayload({ config }))

export const getSiteSettings = cache(async (locale: Locale): Promise<SiteSetting> => {
  const payload = await client()
  return payload.findGlobal({ slug: 'site-settings', locale, depth: 1 })
})

export const getAboutPage = cache(async (locale: Locale): Promise<AboutPage> => {
  const payload = await client()
  return payload.findGlobal({ slug: 'about-page', locale, depth: 1 })
})

export const getNavigation = cache(async (locale: Locale): Promise<Navigation> => {
  const payload = await client()
  return payload.findGlobal({ slug: 'navigation', locale, depth: 0 })
})

export const getCampaigns = cache(
  async (opts: { locale: Locale; limit?: number; featuredOnly?: boolean }): Promise<Campaign[]> => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'campaigns',
      locale: opts.locale,
      depth: 1,
      limit: opts.limit ?? 100,
      overrideAccess: false,
      where: {
        and: [
          { status: { equals: 'published' } },
          ...(opts.featuredOnly ? [{ featured: { equals: true } }] : []),
        ],
      },
      sort: ['order', '-createdAt'],
    })
    return docs
  },
)

export const getCampaignBySlug = cache(
  async (slug: string, locale: Locale): Promise<Campaign | null> => {
    const payload = await client()
    const { docs } = await payload.find({
      collection: 'campaigns',
      locale,
      depth: 2,
      limit: 1,
      overrideAccess: false,
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
      },
    })
    return docs[0] ?? null
  },
)

/** Slugs for generateStaticParams and the sitemap. Locale-independent. */
export const getAllCampaignSlugs = cache(async (): Promise<{ slug: string; updatedAt: string }[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'campaigns',
    depth: 0,
    limit: 1000,
    pagination: false,
    overrideAccess: false,
    where: { status: { equals: 'published' } },
    select: { slug: true, updatedAt: true },
  })
  return docs
    .filter((doc): doc is typeof doc & { slug: string } => Boolean(doc.slug))
    .map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }))
})

export const getFaqs = cache(async (locale: Locale): Promise<Faq[]> => {
  const payload = await client()
  const { docs } = await payload.find({
    collection: 'faqs',
    locale,
    depth: 0,
    limit: 200,
    sort: 'order',
  })
  return docs
})

export { client as getPayloadClient }
