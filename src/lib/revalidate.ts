import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

/**
 * Refresh the public site as soon as content is saved in the admin.
 *
 * Public pages are statically cached and would otherwise only refresh on
 * their 5-minute timer — and even then the first visitor still gets the old
 * copy. Editors would publish a memorial and not see it.
 *
 * The whole public site is invalidated rather than individual pages: site
 * settings and navigation appear on every page, and a campaign appears on the
 * homepage, the memorials list, its own page and the sitemap. There are only
 * a few dozen pages and invalidation is lazy — each page is rebuilt on its
 * next visit — so this costs almost nothing and cannot miss a page.
 */
function refreshPublicSite(req: PayloadRequest, reason: string) {
  // Lets scripts that write in bulk opt out: pass context: { skipRevalidate: true }.
  if (req.context?.skipRevalidate) return

  try {
    revalidatePath('/(frontend)/[locale]', 'layout')
    revalidatePath('/sitemap.xml')
  } catch {
    // Outside a Next.js request — the seed script or the Payload CLI — there
    // is no page cache to refresh, and revalidatePath throws. Nothing to do.
    return
  }
  req.payload.logger.info(`Public site refreshed after ${reason}`)
}

export const revalidateOnChange: CollectionAfterChangeHook = ({ doc, req, collection }) => {
  refreshPublicSite(req, `saving ${collection.slug} #${doc.id}`)
  return doc
}

export const revalidateOnDelete: CollectionAfterDeleteHook = ({ doc, req, collection }) => {
  refreshPublicSite(req, `deleting ${collection.slug} #${doc.id}`)
  return doc
}

export const revalidateGlobalOnChange: GlobalAfterChangeHook = ({ doc, req, global }) => {
  refreshPublicSite(req, `saving ${global.slug}`)
  return doc
}
