import type { GlobalConfig } from 'payload'
import { revalidateGlobalOnChange } from '@/lib/revalidate'
import { frontendPaths } from '@/lib/frontendPaths'

/**
 * The link arrays are localized as a whole rather than per-field: each language
 * gets its own list, so admins can show different links per locale and Payload
 * never has to reconcile row IDs across locales.
 */
const linkFields = [
  {
    name: 'label',
    type: 'text' as const,
    label: { en: 'Label', he: 'טקסט הקישור' },
    required: true,
  },
  {
    name: 'url',
    type: 'text' as const,
    label: { en: 'URL', he: 'כתובת' },
    required: true,
    admin: {
      description: {
        en: 'Internal path without the locale prefix, e.g. /about or /campaigns/name. External links must start with https://',
        he: 'נתיב פנימי ללא קידומת השפה, לדוגמה /about או /campaigns/name. קישורים חיצוניים חייבים להתחיל ב-https://',
      },
    },
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: { en: 'Navigation', he: 'ניווט' },
  admin: {
    group: { en: 'Configuration', he: 'הגדרות' },
    // Header and footer links appear on every page.
    preview: (_doc, { locale }) => frontendPaths.home(locale),
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
      name: 'headerLinks',
      type: 'array',
      label: { en: 'Header Links', he: 'קישורי תפריט עליון' },
      localized: true,
      labels: {
        singular: { en: 'Header Link', he: 'קישור בתפריט העליון' },
        plural: { en: 'Header Links', he: 'קישורי תפריט עליון' },
      },
      fields: linkFields,
    },
    {
      name: 'headerCta',
      type: 'group',
      label: { en: 'Header Donate Button', he: 'כפתור התרומה בתפריט העליון' },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: { en: 'Label', he: 'טקסט הכפתור' },
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          label: { en: 'URL', he: 'כתובת' },
        },
      ],
    },
    {
      name: 'footerLinks',
      type: 'array',
      label: { en: 'Footer Links', he: 'קישורי כותרת תחתונה' },
      localized: true,
      labels: {
        singular: { en: 'Footer Link', he: 'קישור בכותרת התחתונה' },
        plural: { en: 'Footer Links', he: 'קישורי כותרת תחתונה' },
      },
      fields: linkFields,
    },
    {
      name: 'footerNote',
      type: 'textarea',
      label: { en: 'Footer Note', he: 'הערה בכותרת התחתונה' },
      localized: true,
      admin: {
        description: {
          en: 'Small print shown under the footer links.',
          he: 'טקסט קטן שמוצג מתחת לקישורי הכותרת התחתונה.',
        },
      },
    },
  ],
}
