import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, localeHreflang, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getFaqs } from '@/lib/payload'
import { richTextToPlainText } from '@/lib/richtext'
import { PageHero } from '@/components/layout/PageHero'
import { AccordionItem } from '@/components/ui/Accordion'
import { RichText } from '@/components/ui/RichText'

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
    title: dict.faq.title,
    description: dict.faq.subtitle,
    alternates: {
      canonical: `/${locale}/faq`,
      languages: Object.fromEntries([
        ...locales.map((l) => [localeHreflang[l], `/${l}/faq`]),
        ['x-default', '/he/faq'],
      ]),
    },
  }
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const dict = getDictionary(locale)
  const faqs = await getFaqs(locale)

  // FAQPage structured data helps this content surface directly in search.
  const jsonLd =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: richTextToPlainText(faq.answer, 1000),
            },
          })),
        }
      : null

  return (
    <>
      <PageHero title={dict.faq.title} description={dict.faq.subtitle} />

      <div className="container-prose py-16">
        {faqs.length > 0 ? (
          <ul className="border-t border-night-900/10">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.id} question={faq.question} defaultOpen={index === 0}>
                <RichText data={faq.answer} className="prose-sm sm:prose-base" />
              </AccordionItem>
            ))}
          </ul>
        ) : (
          <p className="text-night-700">{dict.faq.empty}</p>
        )}
      </div>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}
