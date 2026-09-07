import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getCampaigns, getSiteSettings } from '@/lib/payload'
import { localePath } from '@/lib/url'
import { mediaUrl } from '@/lib/media'
import { CampaignCard } from '@/components/campaigns/CampaignCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const revalidate = 300

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const dict = getDictionary(locale)

  const [settings, featured] = await Promise.all([
    getSiteSettings(locale),
    getCampaigns({ locale, featuredOnly: true, limit: 6 }),
  ])

  // Fall back to the most recent campaigns when nothing is flagged as featured.
  const campaigns =
    featured.length > 0 ? featured : await getCampaigns({ locale, limit: 6 })

  const heroImage = mediaUrl(settings.ogImage, 'hero')

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-night-950 text-parchment">
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-950/70 to-night-950"
        />
        {/* A soft candle glow anchored to the reading side of the page. */}
        <div
          aria-hidden="true"
          className="absolute -top-24 start-1/4 h-72 w-72 rounded-full bg-candle-500/15 blur-3xl"
        />

        <div className="container-page relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {settings.siteName}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-mist-200 sm:text-xl">
              {settings.tagline || dict.home.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localePath(locale, '/donate')}
                className="rounded-full bg-candle-500 px-8 py-3.5 text-center text-base font-semibold text-night-950 transition-colors hover:bg-candle-400"
              >
                {dict.home.heroCta}
              </Link>
              <Link
                href={localePath(locale, '/campaigns')}
                className="rounded-full border border-slate-mist-300/40 px-8 py-3.5 text-center text-base font-medium text-parchment transition-colors hover:border-candle-400 hover:text-candle-300"
              >
                {dict.home.heroSecondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured campaigns */}
      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          title={dict.home.featuredTitle}
          description={dict.home.featuredSubtitle}
        />

        {campaigns.length > 0 ? (
          <>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="mt-10">
              <Link
                href={localePath(locale, '/campaigns')}
                className="inline-flex items-center gap-2 text-base font-semibold text-night-800 underline decoration-candle-500 decoration-2 underline-offset-8 hover:text-candle-700"
              >
                {dict.home.viewAll}
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-10 text-night-700">{dict.home.noCampaigns}</p>
        )}
      </section>

      {/* Mission */}
      <section className="bg-slate-mist-100 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading title={dict.home.missionTitle} description={settings.metaDescription} />
          <Link
            href={localePath(locale, '/about')}
            className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-night-800 underline decoration-candle-500 decoration-2 underline-offset-8 hover:text-candle-700"
          >
            {dict.home.missionCta}
          </Link>
        </div>
      </section>
    </>
  )
}
