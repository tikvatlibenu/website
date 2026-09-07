import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Navigation, SiteSetting } from '@/payload-types'
import { localePath } from '@/lib/url'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileNav, type NavItem } from './MobileNav'
import { CandleMark } from '@/components/ui/CandleMark'

/**
 * Header links come from the Navigation global, but the site still works
 * before an admin has configured it, so we fall back to the core pages.
 */
function buildItems(navigation: Navigation, dict: Dictionary, locale: Locale): NavItem[] {
  const configured = navigation.headerLinks ?? []
  if (configured.length > 0) {
    return configured.map((link) => ({
      label: link.label,
      href: localePath(locale, link.url),
      external: /^https?:\/\//i.test(link.url),
    }))
  }

  return [
    { label: dict.nav.campaigns, href: localePath(locale, '/campaigns'), external: false },
    { label: dict.nav.about, href: localePath(locale, '/about'), external: false },
    { label: dict.nav.faq, href: localePath(locale, '/faq'), external: false },
    { label: dict.nav.contact, href: localePath(locale, '/contact'), external: false },
  ]
}

export function SiteHeader({
  locale,
  dict,
  navigation,
  settings,
}: {
  locale: Locale
  dict: Dictionary
  navigation: Navigation
  settings: SiteSetting
}) {
  const items = buildItems(navigation, dict, locale)
  const ctaLabel = navigation.headerCta?.label || dict.nav.donate
  const ctaHref = localePath(locale, navigation.headerCta?.url || '/donate')
  const cta: NavItem = { label: ctaLabel, href: ctaHref, external: false }

  return (
    <header className="sticky top-0 z-50 border-b border-night-900/10 bg-parchment/90 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link
          href={localePath(locale, '/')}
          className="flex items-center gap-2.5 text-night-900"
          aria-label={settings.siteName}
        >
          <CandleMark className="h-8 w-8 shrink-0 text-candle-500" />
          <span className="font-serif text-xl font-medium tracking-tight sm:text-2xl">
            {settings.siteName}
          </span>
        </Link>

        <nav aria-label={dict.nav.menu} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="rounded-md px-3 py-2 text-[0.975rem] text-night-700 transition-colors hover:bg-night-900/5 hover:text-night-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher locale={locale} label={dict.nav.switchLanguage} />
          <Link
            href={cta.href}
            className="rounded-full bg-candle-500 px-4 py-2.5 text-sm font-semibold text-night-950 transition-colors hover:bg-candle-400 sm:px-5"
          >
            {cta.label}
          </Link>
          <MobileNav
            items={items}
            cta={cta}
            menuLabel={dict.nav.menu}
            closeLabel={dict.nav.close}
          />
        </div>
      </div>
    </header>
  )
}
