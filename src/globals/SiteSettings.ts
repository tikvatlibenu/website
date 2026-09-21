import type { GlobalConfig } from 'payload'
import { revalidateGlobalOnChange } from '@/lib/revalidate'
import { frontendPaths } from '@/lib/frontendPaths'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { en: 'Site Settings', he: 'הגדרות האתר' },
  admin: {
    group: { en: 'Configuration', he: 'הגדרות' },
    // Site name, tagline and contact details show on every page; the homepage
    // shows the most of them.
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
      type: 'tabs',
      tabs: [
        {
          label: { en: 'General', he: 'כללי' },
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: { en: 'Site Name', he: 'שם האתר' },
              localized: true,
              required: true,
            },
            {
              name: 'tagline',
              type: 'text',
              label: { en: 'Tagline', he: 'סלוגן' },
              localized: true,
              admin: {
                description: {
                  en: 'Short mission line used in the hero and meta tags.',
                  he: 'משפט חזון קצר שמוצג בראש דף הבית ובתגיות המטא.',
                },
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: { en: 'Meta Description', he: 'תיאור למנועי חיפוש' },
              localized: true,
              maxLength: 200,
              admin: {
                description: {
                  en: 'Default description for search engines.',
                  he: 'תיאור ברירת המחדל למנועי חיפוש.',
                },
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              label: { en: 'Social Sharing Image', he: 'תמונת שיתוף ברשתות' },
              relationTo: 'media',
              admin: {
                description: {
                  en: 'Default social sharing image.',
                  he: 'תמונת ברירת המחדל לשיתוף ברשתות החברתיות.',
                },
              },
            },
          ],
        },
        {
          label: { en: 'Donation', he: 'תרומה' },
          fields: [
            {
              name: 'generalDonationIframeCode',
              type: 'textarea',
              label: { en: 'General Donation Iframe Code', he: 'קוד הטמעה של טופס התרומה הכללי' },
              admin: {
                rows: 8,
                description: {
                  en: 'Raw iframe embed code for the general donation form. Also used as the fallback for campaigns without their own form.',
                  he: 'קוד ה-iframe של טופס התרומה הכללי. משמש גם לקמפיינים שאין להם טופס תרומה משלהם.',
                },
              },
            },
            {
              name: 'donatePageHeading',
              type: 'text',
              label: { en: 'Donate Page Heading', he: 'כותרת דף התרומה' },
              localized: true,
            },
            {
              name: 'donatePageIntro',
              type: 'textarea',
              label: { en: 'Donate Page Intro', he: 'פתיח דף התרומה' },
              localized: true,
            },
          ],
        },
        {
          label: { en: 'Contact', he: 'יצירת קשר' },
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
              label: { en: 'Contact Email', he: 'אימייל ליצירת קשר' },
              required: true,
              admin: {
                description: {
                  en: 'Contact form notifications are sent here.',
                  he: 'התראות על פניות מטופס יצירת הקשר נשלחות לכתובת זו.',
                },
              },
            },
            {
              name: 'contactPhone',
              type: 'text',
              label: { en: 'Contact Phone', he: 'טלפון ליצירת קשר' },
            },
            {
              name: 'address',
              type: 'textarea',
              label: { en: 'Address', he: 'כתובת' },
              localized: true,
            },
            {
              name: 'social',
              type: 'array',
              label: { en: 'Social Links', he: 'רשתות חברתיות' },
              labels: {
                singular: { en: 'Link', he: 'קישור' },
                plural: { en: 'Links', he: 'קישורים' },
              },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: { en: 'Platform', he: 'פלטפורמה' },
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'X / Twitter', value: 'x' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: { en: 'URL', he: 'כתובת' },
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
