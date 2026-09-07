import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { isLocale, locales, localeHreflang, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getAllCampaignSlugs, getCampaignBySlug, getSiteSettings } from '@/lib/payload'
import { mediaAlt, mediaDimensions, mediaUrl } from '@/lib/media'
import { formatDate, formatLifespan } from '@/lib/format'
import { parseVideoUrl } from '@/lib/embed'
import { richTextToPlainText } from '@/lib/richtext'
import { localePath, absoluteUrl } from '@/lib/url'
import { RichText } from '@/components/ui/RichText'
import { DonationEmbed } from '@/components/ui/DonationEmbed'
import { VideoEmbed } from '@/components/ui/VideoEmbed'
import { Gallery, type GalleryItem } from '@/components/campaigns/Gallery'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getAllCampaignSlugs()
  return locales.flatMap((locale) => slugs.map(({ slug }) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const campaign = await getCampaignBySlug(slug, locale)
  if (!campaign) return {}

  const title = campaign.metaTitle || campaign.title
  const description =
    campaign.metaDescription || campaign.excerpt || richTextToPlainText(campaign.description, 180)
  const image = mediaUrl(campaign.coverImage, 'hero')

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/campaigns/${slug}`,
      languages: Object.fromEntries([
        ...locales.map((l) => [localeHreflang[l], `/${l}/campaigns/${slug}`]),
        ['x-default', `/he/campaigns/${slug}`],
      ]),
    },
    openGraph: {
      type: 'profile',
      title,
      description,
      url: absoluteUrl(`/${locale}/campaigns/${slug}`),
      images: image ? [{ url: image }] : undefined,
    },
  }
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: raw, slug } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw
  const dict = getDictionary(locale)

  const campaign = await getCampaignBySlug(slug, locale)
  if (!campaign) notFound()

  const settings = await getSiteSettings(locale)

  const cover = mediaUrl(campaign.coverImage, 'hero')
  const lifespan = formatLifespan(campaign.dateOfBirth, campaign.dateOfDeath)
  const born = formatDate(campaign.dateOfBirth, locale)
  const died = formatDate(campaign.dateOfDeath, locale)
  const video = parseVideoUrl(campaign.videoUrl)

  const gallery: GalleryItem[] = (campaign.gallery ?? [])
    .map((item) => {
      const url = mediaUrl(item.image, 'card')
      if (!url) return null
      const { width, height } = mediaDimensions(item.image)
      return { url, alt: mediaAlt(item.image, campaign.title), width, height }
    })
    .filter((item): item is GalleryItem => item !== null)

  // Campaign-specific form first, general fund form as the fallback.
  const donationCode =
    campaign.donationIframeCode?.trim() || settings.generalDonationIframeCode || null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: campaign.title,
    birthDate: campaign.dateOfBirth ?? undefined,
    deathDate: campaign.dateOfDeath ?? undefined,
    image: cover ? absoluteUrl(cover) : undefined,
    description: campaign.excerpt ?? richTextToPlainText(campaign.description, 300),
    url: absoluteUrl(`/${locale}/campaigns/${slug}`),
  }

  return (
    <>
      {/* Memorial header */}
      <section className="relative isolate overflow-hidden bg-night-950 text-parchment">
        {cover && (
          <Image
            src={cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-night-950/85 via-night-950/75 to-night-950"
        />

        <div className="container-page relative py-16 sm:py-20">
          <Link
            href={localePath(locale, '/campaigns')}
            className="inline-flex items-center gap-2 text-sm text-slate-mist-300 transition-colors hover:text-candle-300"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="rtl:-scale-x-100"
            >
              <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
            {dict.campaigns.backToCampaigns}
          </Link>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end">
            {cover && (
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-card border-2 border-candle-500/40 sm:h-48 sm:w-48">
                <Image
                  src={cover}
                  alt={mediaAlt(campaign.coverImage, campaign.title)}
                  fill
                  sizes="192px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl sm:text-5xl">{campaign.title}</h1>
              {lifespan && (
                <p dir="ltr" className="mt-3 text-xl text-candle-400 rtl:text-end">
                  {lifespan}
                </p>
              )}
              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-mist-300">
                {born && (
                  <div className="flex gap-2">
                    <dt className="text-slate-mist-500">{dict.campaigns.born}:</dt>
                    <dd>{born}</dd>
                  </div>
                )}
                {died && (
                  <div className="flex gap-2">
                    <dt className="text-slate-mist-500">{dict.campaigns.died}:</dt>
                    <dd>{died}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Story, with the donation form pinned alongside it on desktop. */}
      <div className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <article className="min-w-0">
            <RichText data={campaign.description} />

            {video && (
              <section className="mt-12">
                <h2 className="mb-5 text-2xl">{dict.campaigns.video}</h2>
                <VideoEmbed video={video} label={dict.campaigns.video} />
              </section>
            )}

            {gallery.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-5 text-2xl">{dict.campaigns.gallery}</h2>
                <Gallery items={gallery} label={dict.campaigns.gallery} />
              </section>
            )}
          </article>

          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-5 text-2xl">
              {campaign.donationHeading || dict.campaigns.donationHeading}
            </h2>
            <DonationEmbed
              code={donationCode}
              loadingLabel={dict.donate.loading}
              unavailableLabel={dict.donate.unavailable}
              secureLabel={dict.donate.secure}
              minHeight={640}
            />
          </aside>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
