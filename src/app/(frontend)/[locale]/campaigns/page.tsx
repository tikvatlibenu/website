import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, localeHreflang, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getCampaigns } from '@/lib/payload'
import { PageHero } from '@/components/layout/PageHero'
import { CampaignCard } from '@/components/campaigns/CampaignCard'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)

  return {
    title: dict.campaigns.title,
    description: dict.home.featuredSubtitle,
    alternates: {
      canonical: `/${locale}/campaigns`,
      languages: Object.fromEntries([
        ...locales.map((l) => [localeHreflang[l], `/${l}/campaigns`]),
        ['x-default', '/he/campaigns'],
      ]),
    },
  }
}

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const dict = getDictionary(locale)
  const campaigns = await getCampaigns({ locale })

  return (
    <>
      <PageHero title={dict.campaigns.title} description={dict.home.featuredSubtitle} />

      <div className="container-page py-16">
        {campaigns.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <li key={campaign.id}>
                <CampaignCard
                  campaign={campaign}
                  locale={locale}
                  readMoreLabel={dict.campaigns.readMore}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-night-700">{dict.home.noCampaigns}</p>
        )}
      </div>
    </>
  )
}
