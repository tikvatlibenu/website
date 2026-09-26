import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getNavigation, getSiteSettings } from '@/lib/payload'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

/**
 * Inner pages keep the original header/footer chrome; the home page renders
 * its own design-system shell, so the chrome lives here rather than in the
 * locale root layout.
 */
export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale

  const dict = getDictionary(locale)
  const [settings, navigation] = await Promise.all([
    getSiteSettings(locale),
    getNavigation(locale),
  ])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:rounded-md focus:bg-night-900 focus:px-4 focus:py-2 focus:text-parchment"
      >
        {dict.common.skipToContent}
      </a>
      <SiteHeader locale={locale} dict={dict} navigation={navigation} settings={settings} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} dict={dict} navigation={navigation} settings={settings} />
    </>
  )
}
