import type { GlobalConfig } from 'payload'

/**
 * The link arrays are localized as a whole rather than per-field: each language
 * gets its own list, so admins can show different links per locale and Payload
 * never has to reconcile row IDs across locales.
 */
const linkFields = [
  { name: 'label', type: 'text' as const, required: true },
  {
    name: 'url',
    type: 'text' as const,
    required: true,
    admin: {
      description:
        'Internal path without the locale prefix, e.g. /about or /campaigns/name. External links must start with https://',
    },
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: { group: 'Configuration' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'headerLinks',
      type: 'array',
      localized: true,
      labels: { singular: 'Header Link', plural: 'Header Links' },
      fields: linkFields,
    },
    {
      name: 'headerCta',
      type: 'group',
      label: 'Header Donate Button',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'footerLinks',
      type: 'array',
      localized: true,
      labels: { singular: 'Footer Link', plural: 'Footer Links' },
      fields: linkFields,
    },
    {
      name: 'footerNote',
      type: 'textarea',
      localized: true,
      admin: { description: 'Small print shown under the footer links.' },
    },
  ],
}
