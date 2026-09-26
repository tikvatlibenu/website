import { notFound } from 'next/navigation'
import { isLocale, getDirection } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getCampaigns, getHomePage, getNavigation, getSiteSettings } from '@/lib/payload'
import { localePath } from '@/lib/url'
import { mediaUrl } from '@/lib/media'
import { frontendPaths } from '@/lib/frontendPaths'
import { HomeView, type HomeCampaign } from '@/components/home/HomeView'

export const revalidate = 300

/** Годы жизни для карточки кампании: "2008–2021". */
function campaignYears(dateOfBirth?: string | null, dateOfDeath?: string | null): string | undefined {
  const year = (d?: string | null) => (d ? new Date(d).getFullYear() : null)
  const from = year(dateOfBirth)
  const to = year(dateOfDeath)
  if (from && to) return `${from}–${to}`
  if (to) return `${to}`
  return undefined
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const dict = getDictionary(locale)

  const [home, settings, navigation, featured] = await Promise.all([
    getHomePage(locale),
    getSiteSettings(locale),
    getNavigation(locale),
    getCampaigns({ locale, featuredOnly: true, limit: 3 }),
  ])
  const campaignDocs = featured.length > 0 ? featured : await getCampaigns({ locale, limit: 3 })

  const campaigns: HomeCampaign[] = campaignDocs.map((c) => ({
    title: c.title,
    href: frontendPaths.campaign(locale, c.slug ?? ''),
    years: campaignYears(c.dateOfBirth, c.dateOfDeath),
    excerpt: c.excerpt ?? undefined,
    imageUrl: mediaUrl(c.coverImage, 'card') ?? undefined,
    linkLabel: dict.campaigns.readMore,
  }))

  const toHref = (url: string) => (url.startsWith('http') ? url : localePath(locale, url))
  const headerLinks = (navigation.headerLinks ?? []).map((l) => ({ label: l.label, href: toHref(l.url) }))
  const footerLinks = (navigation.footerLinks ?? []).map((l) => ({ label: l.label, href: toHref(l.url) }))

  const social = (settings.social ?? [])
    .filter((s): s is typeof s & { platform: 'facebook' | 'instagram' | 'youtube' | 'whatsapp' } =>
      ['facebook', 'instagram', 'youtube', 'whatsapp'].includes(s.platform),
    )
    .map((s) => ({ platform: s.platform, href: s.url }))

  const whatsappHref = (settings.social ?? []).find((s) => s.platform === 'whatsapp')?.url
  const whatsappNumber = whatsappHref?.match(/(\d{9,15})/)?.[1]

  const donateHref = frontendPaths.donate(locale)

  return (
    <HomeView
      locale={locale}
      dir={getDirection(locale)}
      home={home}
      heroImageUrl={mediaUrl(home.heroImage, 'hero') ?? '/images/home-hero.webp'}
      aboutImageUrl={mediaUrl(home.aboutImage, 'hero') ?? undefined}
      campaigns={campaigns}
      header={{
        links: headerLinks,
        donateHref,
        donateLabel: navigation.headerCta?.label ?? undefined,
        phone: settings.contactPhone ?? undefined,
      }}
      footer={{
        description: settings.metaDescription ?? settings.tagline ?? undefined,
        columnTitle: dict.nav.menu,
        links: footerLinks,
        phone: settings.contactPhone ?? undefined,
        email: settings.contactEmail ?? undefined,
        address: settings.address ?? undefined,
        social,
        donateHref,
        donateLabel: navigation.headerCta?.label ?? undefined,
        registrationNumber: settings.registrationNumber ?? undefined,
        copyright: navigation.footerNote ?? undefined,
      }}
      hrefs={{
        donate: donateHref,
        about: frontendPaths.about(locale),
        contact: localePath(locale, '/contact'),
        campaigns: frontendPaths.campaigns(locale),
      }}
      whatsapp={whatsappNumber}
    />
  )
}
