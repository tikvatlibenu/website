import './(frontend)/globals.css'
import { defaultLocale, getDirection } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { Button } from '@/components/ui/Button'

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
          <Button
            href={`/${defaultLocale}`}
            variant="secondary"
            size="md"
            iconStart="arrow-back"
            className="mt-8"
          >
            {dict.common.backHome}
          </Button>
        </div>
      </body>
    </html>
  )
}
