import type { CollectionConfig } from 'payload'

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
