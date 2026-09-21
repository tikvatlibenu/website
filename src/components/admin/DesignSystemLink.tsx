import type { ServerProps } from 'payload'

const LABELS = {
  he: 'מערכת העיצוב',
  en: 'Design system',
} as const

/**
 * Nav link to the frontend design-system reference page.
 *
 * Rendered by Payload under the collection and global links, so editors and
 * the client can reach the component reference from inside the admin.
 */
export function DesignSystemLink({ i18n }: Partial<ServerProps>) {
  const label = i18n?.language === 'en' ? LABELS.en : LABELS.he

  return (
    <a
      className="nav__link"
      href="/design-system"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ flex: 'none' }}
      >
        <path d="M15 3h6v6M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
      {label}
    </a>
  )
}
