import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Navigation, SiteSetting } from '@/payload-types'
import { localePath } from '@/lib/url'
import { CandleMark } from '@/components/ui/CandleMark'

const SOCIAL_LABEL: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  x: 'X',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
}

export function SiteFooter({
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
  const links = navigation.footerLinks ?? []
  const year = new Date().getFullYear()

  return (
    <footer className="bg-night-950 text-slate-mist-300">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 text-parchment">
              <CandleMark className="h-8 w-8 text-candle-400" />
              <span className="font-serif text-xl">{settings.siteName}</span>
            </div>
            {settings.tagline && (
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-mist-400">
                {settings.tagline}
              </p>
            )}
          </div>

          {links.length > 0 && (
            <nav aria-label={dict.footer.quickLinks}>
              <h2 className="text-sm font-semibold tracking-wide text-parchment uppercase">
                {dict.footer.quickLinks}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => {
                  const external = /^https?:\/\//i.test(link.url)
                  return (
                    <li key={`${link.url}-${link.label}`}>
                      <Link
                        href={localePath(locale, link.url)}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-slate-mist-300 transition-colors hover:text-candle-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-parchment uppercase">
              {dict.contact.details}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {settings.contactEmail && (
                <li>
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="transition-colors hover:text-candle-300"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
              )}
              {settings.contactPhone && (
                <li>
                  <a
                    href={`tel:${settings.contactPhone.replace(/[^\d+]/g, '')}`}
                    dir="ltr"
                    className="inline-block transition-colors hover:text-candle-300"
                  >
                    {settings.contactPhone}
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="whitespace-pre-line text-slate-mist-400">{settings.address}</li>
              )}
            </ul>

            {settings.social && settings.social.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-3">
                {settings.social.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-mist-500/30 px-3 py-1.5 text-xs transition-colors hover:border-candle-400 hover:text-candle-300"
                    >
                      {SOCIAL_LABEL[item.platform] ?? item.platform}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-mist-500/20 pt-6 text-xs text-slate-mist-500">
          {navigation.footerNote && (
            <p className="mb-2 max-w-2xl leading-relaxed">{navigation.footerNote}</p>
          )}
          <p>
            &copy; {year} {settings.siteName}. {dict.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  )
}
