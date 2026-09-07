import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, localeHreflang, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getSiteSettings } from '@/lib/payload'
import { PageHero } from '@/components/layout/PageHero'
import { ContactForm } from '@/components/ui/ContactForm'

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
    title: dict.contact.title,
    description: dict.contact.subtitle,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: Object.fromEntries([
        ...locales.map((l) => [localeHreflang[l], `/${l}/contact`]),
        ['x-default', '/he/contact'],
      ]),
    },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const dict = getDictionary(locale)
  const settings = await getSiteSettings(locale)

  return (
    <>
      <PageHero title={dict.contact.title} description={dict.contact.subtitle} />

      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div className="min-w-0">
            <ContactForm locale={locale} dict={dict} />
          </div>

          <aside>
            <div className="rounded-card border border-night-900/10 bg-slate-mist-100 p-6">
              <h2 className="text-xl">{dict.contact.details}</h2>
              <dl className="mt-5 space-y-4 text-[0.95rem]">
                {settings.contactEmail && (
                  <div>
                    <dt className="text-sm text-night-700/70">{dict.contact.email}</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        dir="ltr"
                        className="inline-block text-night-900 underline decoration-candle-500 underline-offset-4 hover:text-candle-700"
                      >
                        {settings.contactEmail}
                      </a>
                    </dd>
                  </div>
                )}
                {settings.contactPhone && (
                  <div>
                    <dt className="text-sm text-night-700/70">{dict.contact.phone}</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${settings.contactPhone.replace(/[^\d+]/g, '')}`}
                        dir="ltr"
                        className="inline-block text-night-900 underline decoration-candle-500 underline-offset-4 hover:text-candle-700"
                      >
                        {settings.contactPhone}
                      </a>
                    </dd>
                  </div>
                )}
                {settings.address && (
                  <div>
                    <dt className="text-sm text-night-700/70">{dict.contact.address}</dt>
                    <dd className="mt-0.5 whitespace-pre-line text-night-800">
                      {settings.address}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
