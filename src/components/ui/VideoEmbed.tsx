'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { VideoEmbed as VideoEmbedData } from '@/lib/embed'

/**
 * Click-to-play: the player iframe is only mounted after interaction, so
 * media-heavy memorial pages stay fast and no third-party script loads until
 * the visitor asks for it.
 */
export function VideoEmbed({ video, label }: { video: VideoEmbedData; label: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-card bg-night-950">
        <iframe
          src={`${video.embedUrl}${video.embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={label}
      className="group relative block aspect-video w-full overflow-hidden rounded-card bg-night-900"
    >
      {video.posterUrl ? (
        <Image
          src={video.posterUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover opacity-80 transition-opacity group-hover:opacity-95"
        />
      ) : (
        <span className="absolute inset-0 bg-gradient-to-br from-night-800 to-night-950" />
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-candle-500/95 shadow-lg transition-transform group-hover:scale-105">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-night-950 ms-1 rtl:ms-0 rtl:me-1 rtl:-scale-x-100">
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        </span>
      </span>
    </button>
  )
}
