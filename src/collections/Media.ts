import type { CollectionConfig } from 'payload'
import { revalidateOnChange, revalidateOnDelete } from '@/lib/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media', he: 'מדיה' },
    plural: { en: 'Media', he: 'מדיה' },
  },
  admin: {
    group: { en: 'Content', he: 'תוכן' },
  },
  hooks: {
    // Show saved changes on the public site immediately.
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    // When S3 storage is configured the adapter takes over; otherwise files
    // land on local disk under /media.
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: { en: 'Alt Text', he: 'טקסט חלופי' },
      localized: true,
      required: true,
      admin: {
        description: {
          en: 'Describe the image for screen readers and SEO.',
          he: 'תיאור התמונה עבור קוראי מסך ומנועי חיפוש.',
        },
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: { en: 'Caption', he: 'כיתוב' },
      localized: true,
    },
  ],
}
