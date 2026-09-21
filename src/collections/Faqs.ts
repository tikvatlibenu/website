import type { CollectionConfig } from 'payload'
import { revalidateOnChange, revalidateOnDelete } from '@/lib/revalidate'
import { frontendPaths } from '@/lib/frontendPaths'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: { en: 'FAQ', he: 'שאלה נפוצה' },
    plural: { en: 'FAQs', he: 'שאלות נפוצות' },
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'updatedAt'],
    group: { en: 'Content', he: 'תוכן' },
    // FAQs have no page each; they all appear on the FAQ page.
    preview: (_doc, { locale }) => frontendPaths.faq(locale),
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
  defaultSort: 'order',
  fields: [
    {
      name: 'question',
      type: 'text',
      label: { en: 'Question', he: 'שאלה' },
      localized: true,
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      label: { en: 'Answer', he: 'תשובה' },
      localized: true,
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      label: { en: 'Order', he: 'סדר' },
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: {
          en: 'Lower numbers appear first.',
          he: 'מספרים נמוכים מוצגים ראשונים.',
        },
      },
    },
  ],
}
