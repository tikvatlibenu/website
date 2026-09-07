import type { Locale } from '@/i18n/config'

const localeTag: Record<Locale, string> = { he: 'he-IL', en: 'en-GB' }

export function formatDate(value: string | null | undefined, locale: Locale): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(localeTag[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function formatYear(value: string | null | undefined): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return String(date.getUTCFullYear())
}

/** "1998 — 2023" for campaign cards, direction-safe via an en dash. */
export function formatLifespan(
  birth: string | null | undefined,
  death: string | null | undefined,
): string | null {
  const b = formatYear(birth)
  const d = formatYear(death)
  if (b && d) return `${b}\u2013${d}`
  return d || b || null
}
