'use client'

import { useState } from 'react'
import { parseIframe } from '@/lib/embed'

/**
 * Third-party donation forms are pasted by admins as raw embed snippets.
 *
 * When the snippet is a plain iframe (the normal case) we extract its src and
 * render our own <iframe>, which lets us show a loading state, enforce sane
 * sizing and avoid injecting arbitrary HTML into the page. Anything more exotic
 * falls back to rendering the snippet as-is — admin-authored and trusted, but
 * kept in its own isolated block.
 */
export function DonationEmbed({
  code,
  loadingLabel,
  unavailableLabel,
  secureLabel,
  minHeight = 720,
}: {
  code: string | null | undefined
  loadingLabel: string
  unavailableLabel: string
  secureLabel?: string
  minHeight?: number
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const trimmed = code?.trim()

  if (!trimmed) {
    return <EmbedNotice>{unavailableLabel}</EmbedNotice>
  }

  const parsed = parseIframe(trimmed)

  if (!parsed) {
    return (
      <div className="overflow-hidden rounded-card border border-night-900/10 bg-white">
        <div
          className="donation-embed"
          // Admin-authored embed code from the CMS.
          dangerouslySetInnerHTML={{ __html: trimmed }}
        />
      </div>
    )
  }

  const height = parsed.height ?? minHeight

  return (
    <div>
      <div className="relative overflow-hidden rounded-card border border-night-900/10 bg-white shadow-sm">
        {!loaded && !failed && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-mist-100"
            style={{ minHeight: Math.min(height, 520) }}
          >
            <span
              className="h-7 w-7 animate-spin rounded-full border-2 border-candle-500 border-t-transparent"
              aria-hidden="true"
            />
            <p className="px-6 text-center text-sm text-night-700">{loadingLabel}</p>
          </div>
        )}

        {failed ? (
          <EmbedNotice>{unavailableLabel}</EmbedNotice>
        ) : (
          <iframe
            src={parsed.src}
            title={parsed.title ?? loadingLabel}
            height={height}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            allow="payment"
            referrerPolicy="strict-origin-when-cross-origin"
            className="block w-full"
            style={{ height, minHeight: 420 }}
          />
        )}
      </div>

      {secureLabel && (
        <p className="mt-3 flex items-center gap-2 text-xs text-night-700/80">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 1 1 8 0v3" />
          </svg>
          {secureLabel}
        </p>
      )}
    </div>
  )
}

function EmbedNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-dashed border-night-900/20 bg-slate-mist-100 px-6 py-12 text-center">
      <p className="text-sm text-night-700">{children}</p>
    </div>
  )
}
