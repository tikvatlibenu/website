import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: { group: 'Content' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      admin: { description: 'Short lead paragraph shown under the page title.' },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    {
      name: 'body',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional copy shown above the contact form, e.g. response times.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      maxLength: 200,
    },
  ],
}
