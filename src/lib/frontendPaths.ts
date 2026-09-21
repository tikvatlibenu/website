/**
 * Where each piece of CMS content appears on the public site.
 *
 * Shared by the admin (preview buttons, the campaigns list column) and kept
 * next to the routes they mirror, so a link in the admin cannot drift away
 * from the page it points to. Paths are relative: the admin and the site are
 * served from the same origin.
 */

export const frontendPaths = {
  home: (locale: string) => `/${locale}`,
  campaigns: (locale: string) => `/${locale}/campaigns`,
  campaign: (locale: string, slug: string) => `/${locale}/campaigns/${slug}`,
  about: (locale: string) => `/${locale}/about`,
  faq: (locale: string) => `/${locale}/faq`,
  donate: (locale: string) => `/${locale}/donate`,
}

/**
 * A campaign only has a public page once it is published and has a slug;
 * drafts return 404 on the site, so there is nothing to link to.
 */
export function campaignPublicPath(
  locale: string,
  doc: { slug?: unknown; status?: unknown } | null | undefined,
): string | null {
  if (!doc || doc.status !== 'published') return null
  if (typeof doc.slug !== 'string' || !doc.slug) return null
  return frontendPaths.campaign(locale, doc.slug)
}
