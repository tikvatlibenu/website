export const locales = ['he', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'he'

export const localeDirection: Record<Locale, 'rtl' | 'ltr'> = {
  he: 'rtl',
  en: 'ltr',
}

export const localeLabels: Record<Locale, string> = {
  he: 'עברית',
  en: 'English',
}

// hreflang values emitted in <link rel="alternate">
export const localeHreflang: Record<Locale, string> = {
  he: 'he-IL',
  en: 'en',
}

export function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return localeDirection[locale]
}
