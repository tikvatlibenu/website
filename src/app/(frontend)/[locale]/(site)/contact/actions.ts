'use server'

import { isLocale, defaultLocale } from '@/i18n/config'
import { getPayloadClient, getSiteSettings } from '@/lib/payload'
import { sendContactNotification } from '@/lib/email'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  fieldErrors?: Partial<Record<'name' | 'email' | 'message', string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function submitContactForm(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const rawLocale = String(formData.get('locale') ?? '')
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale

  // Honeypot: real visitors never fill this in.
  if (String(formData.get('company') ?? '').trim() !== '') {
    return { status: 'success' }
  }

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const subject = String(formData.get('subject') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const fieldErrors: ContactState['fieldErrors'] = {}
  if (!name) fieldErrors.name = 'required'
  if (!email) fieldErrors.email = 'required'
  else if (!EMAIL_RE.test(email)) fieldErrors.email = 'invalid'
  if (!message) fieldErrors.message = 'required'

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors }
  }

  try {
    const payload = await getPayloadClient()
    const settings = await getSiteSettings(locale)
    const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || settings.contactEmail

    const delivered = await sendContactNotification(
      { name, email, phone, subject, message, locale },
      recipient,
    )

    // Archived regardless of delivery so no enquiry is ever lost.
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        phone: phone || undefined,
        subject: subject || undefined,
        message,
        locale,
        emailDelivered: delivered,
      },
    })

    return { status: 'success' }
  } catch (error) {
    console.error('Contact form submission failed', error)
    return { status: 'error' }
  }
}
