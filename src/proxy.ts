import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

const PUBLIC_FILE = /\.[^/]+$/

/**
 * Search engine crawlers must always see a deterministic redirect, otherwise
 * geo-based routing would make the indexed target depend on the crawl origin.
 */
const CRAWLER_UA =
  /(googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|applebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|petalbot|ahrefsbot|semrushbot)/i

function isCrawler(request: NextRequest): boolean {
  return CRAWLER_UA.test(request.headers.get('user-agent') ?? '')
}

function fromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null
  const entries = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q.split('=')[1]) || 0 : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of entries) {
    if (tag.startsWith('he') || tag.startsWith('iw')) return 'he'
    if (tag.startsWith('en')) return 'en'
  }
  return null
}

/**
 * Israeli visitors get Hebrew, everyone else gets English. Vercel and
 * Cloudflare both expose the country on a request header.
 */
function detectLocale(request: NextRequest): Locale {
  if (isCrawler(request)) return defaultLocale

  const cookie = request.cookies.get('NEXT_LOCALE')?.value
  if (cookie && (locales as readonly string[]).includes(cookie)) return cookie as Locale

  const country =
    request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry') ?? null

  if (country === 'IL') return 'he'
  if (country) return fromAcceptLanguage(request.headers.get('accept-language')) ?? 'en'

  // No geo signal (local dev, self-hosted): fall back to the browser language.
  return fromAcceptLanguage(request.headers.get('accept-language')) ?? defaultLocale
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/media') ||
    // Internal reference page. It renders both directions itself, so it has
    // no locale prefix to redirect to.
    pathname.startsWith('/design-system') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (hasLocale) return NextResponse.next()

  const locale = detectLocale(request)
  const target = new URL(`/${locale}${pathname === '/' ? '' : pathname}${search}`, request.url)

  // 307 keeps the redirect non-permanent so a later geo/cookie change is honoured.
  return NextResponse.redirect(target, 307)
}

export const config = {
  matcher: ['/((?!api|admin|_next/static|_next/image|media|favicon.ico|robots.txt|sitemap.xml).*)'],
}
