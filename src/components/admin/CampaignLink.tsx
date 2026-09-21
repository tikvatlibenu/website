'use client'

import type { DefaultCellComponentProps } from 'payload'
import { useFormFields, useLocale, useTranslation } from '@payloadcms/ui'
import { campaignPublicPath } from '@/lib/frontendPaths'

/**
 * Link from the admin to a campaign's public memorial page, in the locale the
 * admin is currently editing. Drafts get a note instead of a link, because
 * the site only serves published campaigns and the link would 404.
 */

function useLabels() {
  const { i18n } = useTranslation()
  const he = i18n.language === 'he'
  return {
    view: he ? 'צפייה באתר' : 'View on site',
    draft: he ? 'טיוטה — עדיין לא מוצג באתר' : 'Draft — not on the site yet',
    noSlug: he ? 'יש לשמור קודם' : 'Save first',
  }
}

function SiteLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // The list row is itself clickable; keep this click on the link.
      onClick={(event) => event.stopPropagation()}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'underline' }}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

const muted = { color: 'var(--theme-elevation-500)' }

/** Column in the campaigns list. */
export function CampaignLinkCell({ rowData }: DefaultCellComponentProps) {
  const locale = useLocale()
  const labels = useLabels()
  const href = campaignPublicPath(locale.code, rowData)

  if (href) return <SiteLink href={href} label={labels.view} />
  return <span style={muted}>{rowData?.status === 'published' ? labels.noSlug : labels.draft}</span>
}

/** Sidebar block on the campaign edit screen, reflecting the unsaved form. */
export function CampaignLinkField() {
  const locale = useLocale()
  const labels = useLabels()
  const slug = useFormFields(([fields]) => fields.slug?.value)
  const status = useFormFields(([fields]) => fields.status?.value)
  const href = campaignPublicPath(locale.code, { slug, status })

  return (
    <div className="field-type" style={{ marginBottom: 'var(--spacing-field)' }}>
      {href ? (
        <>
          <SiteLink href={href} label={labels.view} />
          <div style={{ ...muted, fontSize: 12, marginTop: 4, direction: 'ltr', wordBreak: 'break-all' }}>
            {href}
          </div>
        </>
      ) : (
        <span style={muted}>{typeof slug === 'string' && slug ? labels.draft : labels.noSlug}</span>
      )}
    </div>
  )
}
