import type { CollectionConfig } from 'payload'
import { slugify } from '@/lib/slugify'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  labels: {
    singular: 'Campaign',
    plural: 'Campaigns',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'featured', 'updatedAt'],
    group: 'Content',
    description: 'A memorial page and donation form for one fallen soul.',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Full name of the person this campaign honours.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL segment, e.g. /he/campaigns/your-slug.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value) return slugify(value)
            const title = typeof data?.title === 'string' ? data.title : undefined
            return title ? slugify(title) : value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this campaign in the featured grid on the homepage.',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first. Leave blank to sort by newest.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Memorial',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'dateOfBirth',
                  type: 'date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
                  },
                },
                {
                  name: 'dateOfDeath',
                  type: 'date',
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
                  },
                },
              ],
            },
            {
              name: 'excerpt',
              type: 'textarea',
              localized: true,
              maxLength: 300,
              admin: {
                description: 'Short summary used on campaign cards and in search results.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
              admin: {
                description: 'The eulogy or biography shown on the memorial page.',
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Photo', plural: 'Photos' },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'videoUrl',
              type: 'text',
              admin: {
                description: 'Full YouTube or Vimeo link. Leave blank for no video.',
              },
              validate: (value: unknown) => {
                if (!value || typeof value !== 'string') return true
                const ok =
                  /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)\//i.test(
                    value,
                  )
                return ok || 'Must be a YouTube or Vimeo URL.'
              },
            },
          ],
        },
        {
          label: 'Donation',
          fields: [
            {
              name: 'donationIframeCode',
              type: 'textarea',
              admin: {
                rows: 8,
                description:
                  'Paste the raw iframe embed code from the donation provider. Leave blank to fall back to the general donation form in Site Settings.',
              },
            },
            {
              name: 'donationHeading',
              type: 'text',
              localized: true,
              admin: {
                description: 'Heading shown above the donation form on this page.',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', localized: true },
            { name: 'metaDescription', type: 'textarea', localized: true, maxLength: 200 },
          ],
        },
      ],
    },
  ],
}
