import type { GlobalConfig } from 'payload'
import { revalidateGlobalOnChange } from '@/lib/revalidate'
import { frontendPaths } from '@/lib/frontendPaths'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: { en: 'About Page', he: 'דף אודות' },
  admin: {
    group: { en: 'Content', he: 'תוכן' },
    preview: (_doc, { locale }) => frontendPaths.about(locale),
  },
  hooks: {
    // Show saved changes on the public site immediately.
    afterChange: [revalidateGlobalOnChange],
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { en: 'Title', he: 'כותרת' },
      localized: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: { en: 'Intro', he: 'פתיח' },
      localized: true,
      admin: {
        description: {
          en: 'Short lead paragraph shown under the page title.',
          he: 'פסקת פתיחה קצרה שמוצגת מתחת לכותרת הדף.',
        },
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      label: { en: 'Hero Image', he: 'תמונה ראשית' },
      relationTo: 'media',
    },
    {
      name: 'body',
      type: 'richText',
      label: { en: 'Body', he: 'תוכן' },
      localized: true,
      admin: {
        description: {
          en: 'The full story, mission and transparency statement.',
          he: 'הסיפור המלא, החזון והצהרת השקיפות.',
        },
      },
    },
    {
      name: 'trustPoints',
      type: 'array',
      localized: true,
      label: { en: 'Trust & Transparency', he: 'אמון ושקיפות' },
      labels: {
        singular: { en: 'Point', he: 'נקודה' },
        plural: { en: 'Points', he: 'נקודות' },
      },
      maxRows: 6,
      admin: {
        description: {
          en: 'Short reassurance cards, e.g. tax deductibility or fund distribution.',
          he: 'כרטיסים קצרים שמחזקים אמון, לדוגמה זיכוי ממס או אופן חלוקת הכספים.',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: { en: 'Title', he: 'כותרת' },
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: { en: 'Description', he: 'תיאור' },
        },
      ],
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: { en: 'Meta Description', he: 'תיאור למנועי חיפוש' },
      localized: true,
      maxLength: 200,
    },
  ],
}
