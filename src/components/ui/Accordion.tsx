'use client'

import { useId, useState } from 'react'

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const buttonId = `${panelId}-button`

  return (
    <li className="border-b border-night-900/10">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-start text-lg font-medium text-night-900 transition-colors hover:text-candle-700"
        >
          <span>{question}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className={`shrink-0 text-candle-600 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-6 text-night-700"
      >
        {children}
      </div>
    </li>
  )
}
