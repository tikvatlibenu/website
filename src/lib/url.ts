import type { Locale } from '@/i18n/config'

export function getServerUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3000'
}

/** Prefix an internal path with the active locale. External URLs pass through. */
export function localePath(locale: Locale, path: string): string {
  if (!path) return `/${locale}`
  if (/^https?:\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path
  }
  const clean = path.startsWith('/') ? path : `/${path}`
  if (clean === '/') return `/${locale}`
  return `/${locale}${clean}`
}

export function absoluteUrl(path: string): string {
  return `${getServerUrl()}${path.startsWith('/') ? path : `/${path}`}`
}
