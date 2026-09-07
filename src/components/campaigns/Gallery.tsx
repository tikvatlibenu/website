'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export type GalleryItem = {
  url: string
  alt: string
  width: number
  height: number
}

export function Gallery({ items, label }: { items: GalleryItem[]; label: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % items.length))
      if (e.key === 'ArrowLeft')
        setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openIndex, items.length])

  if (items.length === 0) return null
  const active = openIndex === null ? null : items[openIndex]

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, index) => (
          <li key={`${item.url}-${index}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-slate-mist-200"
            >
              <Image
                src={item.url}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 45vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-60 flex items-center justify-center bg-night-950/92 p-4"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute top-4 end-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-parchment hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
          <Image
            src={active.url}
            alt={active.alt}
            width={active.width}
            height={active.height}
            className="max-h-[85vh] w-auto rounded-lg object-contain"
          />
        </div>
      )}
    </>
  )
}
