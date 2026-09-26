import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Assistant, Frank_Ruhl_Libre } from 'next/font/google'
import { getDirection, isLocale, localeHreflang, locales, type Locale } from '@/i18n/config'
import { getSiteSettings } from '@/lib/payload'
import { getServerUrl } from '@/lib/url'
import { mediaUrl } from '@/lib/media'

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-assistant',
})

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-frank-ruhl',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const settings = await getSiteSettings(locale)
  const serverUrl = getServerUrl()
  const ogImage = mediaUrl(settings.ogImage, 'hero')

  return {
    metadataBase: new URL(serverUrl),
    title: {
      default: settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.metaDescription ?? settings.tagline ?? undefined,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries([
        ...locales.map((l) => [localeHreflang[l], `/${l}`]),
        ['x-default', `/${locales[0]}`],
      ]),
    },
    openGraph: {
      type: 'website',
      siteName: settings.siteName,
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      url: `${serverUrl}/${locale}`,
      title: settings.siteName,
      description: settings.metaDescription ?? settings.tagline ?? undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale

  const dir = getDirection(locale)

  return (
    <html lang={locale} dir={dir} className={`${assistant.variable} ${frankRuhl.variable}`}>
      <body className="flex min-h-screen flex-col bg-parchment text-night-900 antialiased">
        {children}
      </body>
    </html>
  )
}
