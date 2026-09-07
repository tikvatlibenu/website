/**
 * Helpers for the two kinds of third-party embeds on this site: donation
 * iframes pasted by admins, and YouTube/Vimeo memorial videos.
 */

export type ParsedIframe = {
  src: string
  height: number | null
  title: string | null
}

const ATTR = (name: string) => new RegExp(`${name}\s*=\s*["']([^"']+)["']`, 'i')

/**
 * Pull the iframe out of a pasted embed snippet so we can render a real
 * <iframe> element with our own loading state instead of injecting raw HTML.
 * Returns null when the snippet is not a plain iframe.
 */
export function parseIframe(code: string | null | undefined): ParsedIframe | null {
  if (!code) return null
  const tag = code.match(/<iframe\b[^>]*>/i)?.[0]
  if (!tag) return null

  const src = tag.match(ATTR('src'))?.[1]
  if (!src || !/^https:\/\//i.test(src)) return null

  const rawHeight = tag.match(ATTR('height'))?.[1]
  const parsedHeight = rawHeight ? parseInt(rawHeight, 10) : NaN

  return {
    src,
    height: Number.isFinite(parsedHeight) ? parsedHeight : null,
    title: tag.match(ATTR('title'))?.[1] ?? null,
  }
}

export function hasDonationEmbed(code: string | null | undefined): boolean {
  return Boolean(code && code.trim().length > 0)
}

export type VideoEmbed = {
  provider: 'youtube' | 'vimeo'
  embedUrl: string
  posterUrl: string | null
}

export function parseVideoUrl(url: string | null | undefined): VideoEmbed | null {
  if (!url) return null

  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i,
  )
  if (youtube) {
    const id = youtube[1]
    return {
      provider: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
      posterUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    }
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i)
  if (vimeo) {
    return {
      provider: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeo[1]}`,
      posterUrl: null,
    }
  }

  return null
}
