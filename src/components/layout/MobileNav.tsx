'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export type NavItem = { label: string; href: string; external: boolean }

export function MobileNav({
  items,
  cta,
  menuLabel,
  closeLabel,
}: {
  items: NavItem[]
  cta: NavItem | null
  menuLabel: string
  closeLabel: string
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close on Escape and lock body scroll while the panel is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : menuLabel}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-night-800 transition-colors hover:bg-night-900/5"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <path d="M5 5l14 14" />
              <path d="M19 5L5 19" />
            </>
          ) : (
            <>
              <path d="M3.5 7h17" />
              <path d="M3.5 12h17" />
              <path d="M3.5 17h17" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[var(--header-height,72px)] bottom-0 z-40 overflow-y-auto border-t border-night-900/10 bg-parchment px-5 py-6"
        >
          <nav>
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="block rounded-md px-3 py-3 text-lg text-night-800 transition-colors hover:bg-night-900/5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {cta && (
            <Button
              href={cta.href}
              variant="primary"
              size="lg"
              fullWidth
              iconStart="heart"
              className="mt-6"
            >
              {cta.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
