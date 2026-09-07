'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeLabels, type Locale } from '@/i18n/config'

/**
 * Swaps only the locale segment so the visitor stays on the same page, and
 * remembers the choice so middleware stops geo-guessing on later visits.
 */
export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || `/${locale}`
  const other = locales.find((l) => l !== locale) ?? locale

  const segments = pathname.split('/')
  if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
    segments[1] = other
  } else {
    segments.splice(1, 0, other)
  }
  const href = segments.join('/') || `/${other}`

  const remember = () => {
    document.cookie = `NEXT_LOCALE=${other};path=/;max-age=31536000;samesite=lax`
  }

  return (
    <Link
      href={href}
      onClick={remember}
      hrefLang={other}
      aria-label={label}
      className="rounded-full border border-night-700/40 px-3 py-1.5 text-sm font-medium text-night-700 transition-colors hover:border-candle-500 hover:text-candle-700"
    >
      {localeLabels[other]}
    </Link>
  )
}
