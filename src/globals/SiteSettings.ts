import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Configuration' },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'siteName', type: 'text', localized: true, required: true },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              admin: { description: 'Short mission line used in the hero and meta tags.' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              maxLength: 200,
              admin: { description: 'Default description for search engines.' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Default social sharing image.' },
            },
          ],
        },
        {
          label: 'Donation',
          fields: [
            {
              name: 'generalDonationIframeCode',
              type: 'textarea',
              admin: {
                rows: 8,
                description:
                  'Raw iframe embed code for the general donation form. Also used as the fallback for campaigns without their own form.',
              },
            },
            {
              name: 'donatePageHeading',
              type: 'text',
              localized: true,
            },
            {
              name: 'donatePageIntro',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
              required: true,
              admin: { description: 'Contact form notifications are sent here.' },
            },
            { name: 'contactPhone', type: 'text' },
            { name: 'address', type: 'textarea', localized: true },
            {
              name: 'social',
              type: 'array',
              labels: { singular: 'Link', plural: 'Links' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'X / Twitter', value: 'x' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                  ],
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
