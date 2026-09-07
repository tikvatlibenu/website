import 'server-only'
import { Resend } from 'resend'

let cached: Resend | null = null

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null
  if (!cached) cached = new Resend(process.env.RESEND_API_KEY)
  return cached
}

export type ContactPayload = {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  locale: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 16px 8px 0;color:#7a879d;font-size:13px;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:8px 0;color:#0c1424;font-size:15px">${escapeHtml(value)}</td>
  </tr>`
}

/**
 * Notifies the site administrator about a new contact submission.
 * Returns false rather than throwing so the visitor still sees a success
 * state when the submission was stored but the email could not be sent.
 */
export async function sendContactNotification(
  payload: ContactPayload,
  to: string,
): Promise<boolean> {
  const resend = getResend()
  if (!resend || !to) return false

  const from = process.env.RESEND_FROM_EMAIL || 'Tikvatlibenu <onboarding@resend.dev>'
  const subject = payload.subject
    ? `New enquiry: ${payload.subject}`
    : `New enquiry from ${payload.name}`

  const html = `<!doctype html>
<html><body style="margin:0;background:#f6f7f9;padding:32px 16px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
  <table role="presentation" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e8ebf0">
    <tr><td style="padding:28px 28px 8px">
      <h1 style="margin:0;font-size:19px;color:#0c1424;font-weight:600">New contact form submission</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#7a879d">tikvatlibenu.co.il &middot; language: ${escapeHtml(payload.locale)}</p>
    </td></tr>
    <tr><td style="padding:12px 28px 4px">
      <table role="presentation" style="width:100%;border-collapse:collapse">
        ${row('Name', payload.name)}
        ${row('Email', payload.email)}
        ${payload.phone ? row('Phone', payload.phone) : ''}
        ${payload.subject ? row('Subject', payload.subject) : ''}
      </table>
    </td></tr>
    <tr><td style="padding:16px 28px 28px">
      <div style="border-top:1px solid #e8ebf0;padding-top:16px;font-size:15px;line-height:1.6;color:#16233b;white-space:pre-wrap">${escapeHtml(payload.message)}</div>
    </td></tr>
  </table>
</body></html>`

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      replyTo: payload.email,
      html,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.phone ? `Phone: ${payload.phone}` : null,
        payload.subject ? `Subject: ${payload.subject}` : null,
        '',
        payload.message,
      ]
        .filter(Boolean)
        .join('\n'),
    })
    return !error
  } catch {
    return false
  }
}
