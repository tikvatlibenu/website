import type { CollectionConfig } from 'payload'

/**
 * Submissions are archived here as well as emailed, so nothing is lost if
 * Resend delivery fails.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    group: 'Admin',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'locale',
      type: 'text',
      admin: { description: 'Language the visitor used when submitting.' },
    },
    {
      name: 'emailDelivered',
      type: 'checkbox',
      defaultValue: false,
      admin: { readOnly: true },
    },
  ],
}
