'use client'

import type React from 'react'
import Link from 'next/link'

/**
 * Pill-shaped action button, matching the `@tikvat-libenu/ui` Button contract.
 *
 * `primary` (pink) is reserved for the single most important action on a view —
 * usually donating. Everything else is navy, outlined, or pale.
 */
export type ButtonVariant =
  | 'soft'
  | 'outline'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'inverse'
  | 'inverse-outline'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Icon before the label (at the right in Hebrew). */
  iconStart?: string
  /** Icon after the label. `arrow-forward` flips to point left in RTL. */
  iconEnd?: string
  /** Show a spinner and block clicks while an action is in flight. */
  loading?: boolean
  disabled?: boolean
  /** Stretch to the container width (mobile CTAs, forms). */
  fullWidth?: boolean
  /** Render as a link (`<a>`) instead of a `<button>`. */
  href?: string
  target?: '_blank' | '_self'
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLElement>
  'aria-label'?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const ICON_SIZE: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 }

export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  loading = false,
  disabled = false,
  fullWidth = false,
  href,
  target,
  type = 'button',
  onClick,
  className,
  style,
  children,
  ...rest
}: ButtonProps) {
  const inactive = disabled || loading

  const classes = [
    'tl-btn',
    `tl-btn--${variant}`,
    `tl-btn--${size}`,
    fullWidth && 'tl-btn--full',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconPx = ICON_SIZE[size]

  const content = (
    <>
      {loading ? (
        <Spinner size={iconPx} />
      ) : (
        iconStart && <Icon name={iconStart} size={iconPx} />
      )}
      {children}
      {!loading && iconEnd && <Icon name={iconEnd} size={iconPx} />}
    </>
  )

  if (href) {
    const linkProps = {
      target,
      rel: target === '_blank' ? 'noopener noreferrer' : undefined,
      'aria-busy': loading || undefined,
      className: classes,
      style,
      ...rest,
    }

    // A disabled link keeps its place in the layout but leaves the tab order.
    if (inactive) {
      return (
        <a aria-disabled="true" tabIndex={-1} {...linkProps}>
          {content}
        </a>
      )
    }

    // Internal routes go through next/link so navigation stays client-side.
    const internal = href.startsWith('/') && target !== '_blank'

    return internal ? (
      <Link href={href} onClick={onClick} {...linkProps}>
        {content}
      </Link>
    ) : (
      <a href={href} onClick={onClick} {...linkProps}>
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={inactive}
      aria-busy={loading || undefined}
      onClick={onClick}
      className={classes}
      style={style}
      {...rest}
    >
      {content}
    </button>
  )
}

function Spinner({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="tl-btn__spinner"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Icons that should point the way the text reads. */
const DIRECTIONAL = new Set(['arrow-forward', 'arrow-back', 'chevron-forward', 'chevron-back'])

const ICONS: Record<string, React.ReactNode> = {
  heart: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  'arrow-forward': <path d="M5 12h14M12 5l7 7-7 7" />,
  'arrow-back': <path d="M19 12H5M12 19l-7-7 7-7" />,
  'chevron-forward': <path d="m9 18 6-6-6-6" />,
  'chevron-back': <path d="m15 18-6-6 6-6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-up': <path d="m18 15-6-6-6 6" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="M20 6 9 17l-5-5" />,
  'external-link': (
    <>
      <path d="M15 3h6v6M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>
  ),
  download: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
  share: <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />,
}

function Icon({ name, size }: { name: string; size: number }) {
  const path = ICONS[name]
  // An unknown icon name renders nothing rather than breaking the button.
  if (!path) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`tl-btn__icon${DIRECTIONAL.has(name) ? ' tl-btn__icon--directional' : ''}`}
    >
      {path}
    </svg>
  )
}
