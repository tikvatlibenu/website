import type { CollectionConfig, TextFieldSingleValidation } from 'payload'
import { slugify } from '@/lib/slugify'
import { campaignPublicPath } from '@/lib/frontendPaths'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  labels: {
    singular: { en: 'Campaign', he: 'קמפיין' },
    plural: { en: 'Campaigns', he: 'קמפיינים' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'viewOnSite', 'featured', 'updatedAt'],
    // "Preview" button on the edit screen, opening the public page in the
    // locale being edited. Hidden for drafts, which the site does not serve.
    preview: (doc, { locale }) => campaignPublicPath(locale, doc),
    group: { en: 'Content', he: 'תוכן' },
    description: {
      en: 'A memorial page and donation form for one fallen soul.',
      he: 'דף הנצחה וטופס תרומה לזכרו של נופל אחד.',
    },
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
      label: { en: 'Full Name', he: 'שם מלא' },
      localized: true,
      required: true,
      admin: {
        description: {
          en: 'Full name of the person this campaign honours.',
          he: 'שמו המלא של האדם שלזכרו הקמפיין.',
        },
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: { en: 'Slug', he: 'כתובת (Slug)' },
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: {
          en: 'URL segment, e.g. /he/campaigns/your-slug.',
          he: 'החלק בכתובת הדף, לדוגמה /he/campaigns/your-slug. באותיות לועזיות בלבד.',
        },
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
      label: { en: 'Status', he: 'סטטוס' },
      required: true,
      defaultValue: 'draft',
      options: [
        { label: { en: 'Draft', he: 'טיוטה' }, value: 'draft' },
        { label: { en: 'Published', he: 'פורסם' }, value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      // Display-only: a link to the public memorial page, shown in the list
      // table and in the edit sidebar. `ui` fields have no database column.
      name: 'viewOnSite',
      type: 'ui',
      label: { en: 'Page on site', he: 'הדף באתר' },
      admin: {
        position: 'sidebar',
        components: {
          Cell: '/components/admin/CampaignLink#CampaignLinkCell',
          Field: '/components/admin/CampaignLink#CampaignLinkField',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: { en: 'Featured', he: 'מוצג בדף הבית' },
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: {
          en: 'Show this campaign in the featured grid on the homepage.',
          he: 'הצגת הקמפיין ברשת הקמפיינים המובילים בדף הבית.',
        },
      },
    },
    {
      name: 'order',
      type: 'number',
      label: { en: 'Order', he: 'סדר' },
      admin: {
        position: 'sidebar',
        description: {
          en: 'Lower numbers appear first. Leave blank to sort by newest.',
          he: 'מספרים נמוכים מוצגים ראשונים. השאירו ריק למיון מהחדש לישן.',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Memorial', he: 'הנצחה' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'dateOfBirth',
                  type: 'date',
                  label: { en: 'Date of Birth', he: 'תאריך לידה' },
                  admin: {
                    width: '50%',
                    date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
                  },
                },
                {
                  name: 'dateOfDeath',
                  type: 'date',
                  label: { en: 'Date of Death', he: 'תאריך פטירה' },
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
              label: { en: 'Excerpt', he: 'תקציר' },
              localized: true,
              maxLength: 300,
              admin: {
                description: {
                  en: 'Short summary used on campaign cards and in search results.',
                  he: 'תיאור קצר שמוצג בכרטיסי הקמפיינים ובתוצאות החיפוש.',
                },
              },
            },
            {
              name: 'description',
              type: 'richText',
              label: { en: 'Eulogy / Biography', he: 'הספד / סיפור חיים' },
              localized: true,
              required: true,
              admin: {
                description: {
                  en: 'The eulogy or biography shown on the memorial page.',
                  he: 'ההספד או סיפור החיים שמוצג בדף ההנצחה.',
                },
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              label: { en: 'Cover Image', he: 'תמונה ראשית' },
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gallery',
              type: 'array',
              label: { en: 'Gallery', he: 'גלריה' },
              labels: {
                singular: { en: 'Photo', he: 'תמונה' },
                plural: { en: 'Photos', he: 'תמונות' },
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: { en: 'Image', he: 'תמונה' },
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'videoUrl',
              type: 'text',
              label: { en: 'Video URL', he: 'קישור לסרטון' },
              admin: {
                description: {
                  en: 'Full YouTube or Vimeo link. Leave blank for no video.',
                  he: 'קישור מלא ל-YouTube או ל-Vimeo. השאירו ריק אם אין סרטון.',
                },
              },
              validate: ((value, { req }) => {
                if (!value || typeof value !== 'string') return true
                const ok =
                  /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)\//i.test(
                    value,
                  )
                if (ok) return true
                return req.i18n.language === 'en'
                  ? 'Must be a YouTube or Vimeo URL.'
                  : 'יש להזין קישור ל-YouTube או ל-Vimeo.'
              }) satisfies TextFieldSingleValidation,
            },
          ],
        },
        {
          label: { en: 'Donation', he: 'תרומה' },
          fields: [
            {
              name: 'donationIframeCode',
              type: 'textarea',
              label: { en: 'Donation Iframe Code', he: 'קוד הטמעה של טופס התרומה' },
              admin: {
                rows: 8,
                description: {
                  en: 'Paste the raw iframe embed code from the donation provider. Leave blank to fall back to the general donation form in Site Settings.',
                  he: 'הדביקו את קוד ה-iframe שקיבלתם מספק התרומות. השאירו ריק כדי להשתמש בטופס התרומה הכללי שמוגדר בהגדרות האתר.',
                },
              },
            },
            {
              name: 'donationHeading',
              type: 'text',
              label: { en: 'Donation Heading', he: 'כותרת אזור התרומה' },
              localized: true,
              admin: {
                description: {
                  en: 'Heading shown above the donation form on this page.',
                  he: 'הכותרת שמוצגת מעל טופס התרומה בדף זה.',
                },
              },
            },
          ],
        },
        {
          label: { en: 'SEO', he: 'קידום אתרים (SEO)' },
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: { en: 'Meta Title', he: 'כותרת למנועי חיפוש' },
              localized: true,
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: { en: 'Meta Description', he: 'תיאור למנועי חיפוש' },
              localized: true,
              maxLength: 200,
            },
          ],
        },
      ],
    },
  ],
}
