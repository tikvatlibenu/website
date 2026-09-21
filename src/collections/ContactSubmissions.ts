import type { CollectionConfig } from 'payload'

/**
 * Submissions are archived here as well as emailed, so nothing is lost if
 * Resend delivery fails.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: { en: 'Contact Submission', he: 'פנייה' },
    plural: { en: 'Contact Submissions', he: 'פניות' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    group: { en: 'Admin', he: 'ניהול' },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', label: { en: 'Name', he: 'שם' }, required: true },
    { name: 'email', type: 'email', label: { en: 'Email', he: 'אימייל' }, required: true },
    { name: 'phone', type: 'text', label: { en: 'Phone', he: 'טלפון' } },
    { name: 'subject', type: 'text', label: { en: 'Subject', he: 'נושא' } },
    {
      name: 'message',
      type: 'textarea',
      label: { en: 'Message', he: 'הודעה' },
      required: true,
    },
    {
      name: 'locale',
      type: 'text',
      label: { en: 'Language', he: 'שפה' },
      admin: {
        description: {
          en: 'Language the visitor used when submitting.',
          he: 'השפה שבה הגולש שלח את הפנייה.',
        },
      },
    },
    {
      name: 'emailDelivered',
      type: 'checkbox',
      label: { en: 'Email Delivered', he: 'האימייל נשלח' },
      defaultValue: false,
      admin: { readOnly: true },
    },
  ],
}
