import Link from 'next/link'
import { getDictionary } from '@/i18n/dictionaries'
import { defaultLocale } from '@/i18n/config'

/**
 * Rendered for unmatched paths under a locale. It cannot read params, so it
 * falls back to the default locale copy.
 */
export default function LocaleNotFound() {
  const dict = getDictionary(defaultLocale)

  return (
    <div className="container-prose flex min-h-[55vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-light text-candle-500">404</p>
      <h1 className="mt-4 text-3xl">{dict.common.notFoundTitle}</h1>
      <p className="mt-3 text-night-700">{dict.common.notFoundBody}</p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-8 rounded-full bg-candle-500 px-7 py-3 text-base font-semibold text-night-950 transition-colors hover:bg-candle-400"
      >
        {dict.common.backHome}
      </Link>
    </div>
  )
}
