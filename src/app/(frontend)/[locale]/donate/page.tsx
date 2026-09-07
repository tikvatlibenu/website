import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, localeHreflang, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getSiteSettings } from '@/lib/payload'
import { PageHero } from '@/components/layout/PageHero'
import { DonationEmbed } from '@/components/ui/DonationEmbed'

export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [settings, dict] = [await getSiteSettings(locale), getDictionary(locale)]

  return {
    title: settings.donatePageHeading || dict.donate.title,
    description: settings.donatePageIntro || dict.donate.intro,
    alternates: {
      canonical: `/${locale}/donate`,
      languages: Object.fromEntries([
        ...locales.map((l) => [localeHreflang[l], `/${l}/donate`]),
        ['x-default', '/he/donate'],
      ]),
    },
  }
}

export default async function DonatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const dict = getDictionary(locale)
  const settings = await getSiteSettings(locale)

  return (
    <>
      <PageHero
        title={settings.donatePageHeading || dict.donate.title}
        description={settings.donatePageIntro || dict.donate.intro}
      />

      <div className="container-page py-14">
        <div className="mx-auto max-w-3xl">
          <DonationEmbed
            code={settings.generalDonationIframeCode}
            loadingLabel={dict.donate.loading}
            unavailableLabel={dict.donate.unavailable}
            secureLabel={dict.donate.secure}
          />
        </div>
      </div>
    </>
  )
}
