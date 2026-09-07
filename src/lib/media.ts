import type { Media } from '@/payload-types'

export type MediaLike = Media | number | null | undefined

export function asMedia(value: MediaLike): Media | null {
  return value && typeof value === 'object' ? value : null
}

export function mediaUrl(value: MediaLike, size?: 'thumbnail' | 'card' | 'hero'): string | null {
  const media = asMedia(value)
  if (!media) return null
  if (size) {
    const sized = media.sizes?.[size]
    if (sized?.url) return sized.url
  }
  return media.url ?? null
}

export function mediaAlt(value: MediaLike, fallback = ''): string {
  return asMedia(value)?.alt ?? fallback
}

export function mediaDimensions(value: MediaLike): { width: number; height: number } {
  const media = asMedia(value)
  return {
    width: media?.width ?? 1600,
    height: media?.height ?? 1200,
  }
}
