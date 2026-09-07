import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
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
      admin: { description: 'The full story, mission and transparency statement.' },
    },
    {
      name: 'trustPoints',
      type: 'array',
      localized: true,
      label: 'Trust & Transparency',
      labels: { singular: 'Point', plural: 'Points' },
      maxRows: 6,
      admin: {
        description: 'Short reassurance cards, e.g. tax deductibility or fund distribution.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      maxLength: 200,
    },
  ],
}
