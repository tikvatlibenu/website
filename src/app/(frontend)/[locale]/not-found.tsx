import { getDictionary } from '@/i18n/dictionaries'
import { defaultLocale } from '@/i18n/config'
import { Button } from '@/components/ui/Button'

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
  )
}
