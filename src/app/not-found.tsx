import Link from 'next/link'
import './(frontend)/globals.css'
import { defaultLocale, getDirection } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/**
 * Root-level fallback for paths outside any locale segment, e.g. an unknown
 * locale prefix that fails validation in the locale layout.
 */
export default function GlobalNotFound() {
  const dict = getDictionary(defaultLocale)

  return (
    <html lang={defaultLocale} dir={getDirection(defaultLocale)}>
      <body className="bg-parchment text-night-900 antialiased">
        <div className="container-prose flex min-h-screen flex-col items-center justify-center py-24 text-center">
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
      </body>
    </html>
  )
}
