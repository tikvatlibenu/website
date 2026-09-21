'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { Button } from '@/components/ui/Button'
import { submitContactForm, type ContactState } from '@/app/(frontend)/[locale]/contact/actions'

const initialState: ContactState = { status: 'idle' }

const fieldClass =
  'w-full rounded-lg border border-night-900/15 bg-white px-4 py-3 text-base text-night-900 transition-colors placeholder:text-slate-mist-500 focus:border-candle-500 focus:outline-none'

function SubmitButton({ dict }: { dict: Dictionary }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="secondary" size="md" loading={pending}>
      {pending ? dict.contact.sending : dict.contact.send}
    </Button>
  )
}

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, formAction] = useActionState(submitContactForm, initialState)

  const errorFor = (field: 'name' | 'email' | 'message') => {
    const code = state.fieldErrors?.[field]
    if (!code) return null
    return code === 'invalid' ? dict.contact.invalidEmail : dict.contact.required
  }

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className="rounded-card border border-candle-500/40 bg-candle-300/15 px-6 py-10 text-center"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="mx-auto text-candle-600"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.2 2.4 2.4 4.6-4.8" />
        </svg>
        <p className="mt-4 text-lg text-night-800">{dict.contact.success}</p>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot, hidden from people but visible to naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && !state.fieldErrors && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {dict.contact.error}
        </p>
      )}

      <Field
        id="name"
        label={dict.contact.name}
        required
        autoComplete="name"
        error={errorFor('name')}
      />
      <Field
        id="email"
        type="email"
        label={dict.contact.email}
        required
        autoComplete="email"
        dir="ltr"
        error={errorFor('email')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="phone"
          type="tel"
          label={`${dict.contact.phone} (${dict.contact.optional})`}
          autoComplete="tel"
          dir="ltr"
        />
        <Field id="subject" label={`${dict.contact.subject} (${dict.contact.optional})`} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-night-800">
          {dict.contact.message} <span className="text-candle-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-describedby={errorFor('message') ? 'message-error' : undefined}
          aria-invalid={Boolean(errorFor('message'))}
          className={`${fieldClass} resize-y`}
        />
        {errorFor('message') && (
          <p id="message-error" className="mt-1.5 text-sm text-red-700">
            {errorFor('message')}
          </p>
        )}
      </div>

      <div>
        <SubmitButton dict={dict} />
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  type = 'text',
  required = false,
  autoComplete,
  dir,
  error,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  dir?: 'ltr' | 'rtl'
  error?: string | null
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-night-800">
        {label} {required && <span className="text-candle-700">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        dir={dir}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={fieldClass}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
