import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { isLocale, localeHreflang, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getAboutPage, getSiteSettings } from '@/lib/payload'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { RichText } from '@/components/ui/RichText'
import { PageHero } from '@/components/layout/PageHero'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [about, dict] = [await getAboutPage(locale), getDictionary(locale)]
  const title = about.title || dict.about.title

  return {
    title,
    description: about.metaDescription ?? about.intro ?? undefined,
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries([
        ...locales.map((l) => [localeHreflang[l], `/${l}/about`]),
        ['x-default', '/he/about'],
      ]),
    },
  }
}

export default async function AboutPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const dict = getDictionary(locale)

  const [about, settings] = await Promise.all([getAboutPage(locale), getSiteSettings(locale)])
  const hero = mediaUrl(about.heroImage, 'hero')

  return (
    <>
      <PageHero
        title={about.title || dict.about.title}
        description={about.intro || settings.tagline}
      />

      <div className="container-prose py-16">
        {hero && (
          <div className="relative mb-12 aspect-16/9 overflow-hidden rounded-card bg-slate-mist-200">
            <Image
              src={hero}
              alt={mediaAlt(about.heroImage)}
              fill
              sizes="(max-width: 768px) 100vw, 736px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <RichText data={about.body} />
      </div>

      {about.trustPoints && about.trustPoints.length > 0 && (
        <section className="bg-slate-mist-100 py-16">
          <div className="container-page">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.trustPoints.map((point, index) => (
                <li
                  key={point.id ?? index}
                  className="rounded-card border border-night-900/10 bg-white p-6"
                >
                  <h2 className="rule-start text-lg">{point.title}</h2>
                  {point.description && (
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-night-700/90">
                      {point.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
