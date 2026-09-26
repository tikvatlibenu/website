import type { GlobalConfig } from 'payload'
import { revalidateGlobalOnChange } from '@/lib/revalidate'
import { frontendPaths } from '@/lib/frontendPaths'

/**
 * Home page content, one tab per section in the order the page reads.
 * Every text on the page lives here so the charity can edit it without code;
 * the seed fills honest defaults verified against the public NPO registry.
 */
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: { en: 'Home Page', he: 'דף הבית' },
  admin: {
    group: { en: 'Content', he: 'תוכן' },
    preview: (_doc, { locale }) => frontendPaths.home(locale),
  },
  hooks: {
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
          label: { en: 'Hero', he: 'פתיח' },
          fields: [
            { name: 'heroEyebrow', type: 'text', label: { en: 'Eyebrow', he: 'כותרת עליונה' }, localized: true },
            { name: 'heroTitle', type: 'text', label: { en: 'Title', he: 'כותרת' }, localized: true, required: true },
            {
              name: 'heroTitleHighlight',
              type: 'text',
              label: { en: 'Highlighted part of the title', he: 'החלק המודגש בכותרת' },
              localized: true,
              admin: {
                description: {
                  en: 'Rendered after the title with the yellow marker highlight.',
                  he: 'מוצג אחרי הכותרת עם הדגשת מרקר צהובה.',
                },
              },
            },
            { name: 'heroDescription', type: 'textarea', label: { en: 'Description', he: 'תיאור' }, localized: true },
            {
              name: 'heroImage',
              type: 'upload',
              label: { en: 'Photo', he: 'תמונה' },
              relationTo: 'media',
            },
            { name: 'heroPrimaryLabel', type: 'text', label: { en: 'Primary button', he: 'כפתור ראשי' }, localized: true },
            { name: 'heroSecondaryLabel', type: 'text', label: { en: 'Secondary button', he: 'כפתור משני' }, localized: true },
            {
              name: 'heroHighlights',
              type: 'array',
              label: { en: 'Proof points', he: 'נקודות חוזק' },
              localized: true,
              maxRows: 3,
              admin: {
                description: {
                  en: 'Up to three short proof points under the buttons. Only verifiable claims.',
                  he: 'עד שלוש נקודות קצרות מתחת לכפתורים. רק טענות שניתן לאמת.',
                },
              },
              fields: [
                { name: 'value', type: 'text', required: true, label: { en: 'Value', he: 'ערך' } },
                { name: 'label', type: 'text', required: true, label: { en: 'Label', he: 'תווית' } },
              ],
            },
          ],
        },
        {
          label: { en: 'Services', he: 'הפעילות' },
          fields: [
            { name: 'servicesEyebrow', type: 'text', label: { en: 'Eyebrow', he: 'כותרת עליונה' }, localized: true },
            { name: 'servicesTitle', type: 'text', label: { en: 'Title', he: 'כותרת' }, localized: true },
            { name: 'servicesDescription', type: 'textarea', label: { en: 'Description', he: 'תיאור' }, localized: true },
            {
              name: 'services',
              type: 'array',
              label: { en: 'Service cards', he: 'כרטיסי פעילות' },
              localized: true,
              maxRows: 4,
              fields: [
                {
                  name: 'tone',
                  type: 'select',
                  required: true,
                  label: { en: 'Color', he: 'צבע' },
                  options: [
                    { value: 'teal', label: { en: 'Teal', he: 'טורקיז' } },
                    { value: 'pink', label: { en: 'Pink', he: 'ורוד' } },
                    { value: 'yellow', label: { en: 'Yellow', he: 'צהוב' } },
                    { value: 'navy', label: { en: 'Navy', he: 'כחול כהה' } },
                  ],
                },
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  label: { en: 'Icon', he: 'אייקון' },
                  options: [
                    { value: 'stethoscope', label: { en: 'Stethoscope', he: 'סטטוסקופ' } },
                    { value: 'heart-handshake', label: { en: 'Heart & handshake', he: 'לב ולחיצת יד' } },
                    { value: 'users', label: { en: 'People', he: 'אנשים' } },
                    { value: 'sun', label: { en: 'Sun', he: 'שמש' } },
                    { value: 'heart', label: { en: 'Heart', he: 'לב' } },
                    { value: 'gift', label: { en: 'Gift', he: 'מתנה' } },
                  ],
                },
                { name: 'title', type: 'text', required: true, label: { en: 'Title', he: 'כותרת' } },
                { name: 'description', type: 'textarea', label: { en: 'Description', he: 'תיאור' } },
              ],
            },
          ],
        },
        {
          label: { en: 'Transparency', he: 'שקיפות' },
          fields: [
            { name: 'transparencyEyebrow', type: 'text', label: { en: 'Eyebrow', he: 'כותרת עליונה' }, localized: true },
            { name: 'transparencyTitle', type: 'text', label: { en: 'Title', he: 'כותרת' }, localized: true },
            { name: 'transparencyDescription', type: 'textarea', label: { en: 'Description', he: 'תיאור' }, localized: true },
            {
              name: 'transparencyItems',
              type: 'array',
              label: { en: 'Facts', he: 'עובדות' },
              localized: true,
              maxRows: 4,
              admin: {
                description: {
                  en: 'Facts a donor can verify in the public registry (Guidestar). No unverifiable numbers.',
                  he: 'עובדות שתורם יכול לאמת במרשם הציבורי (גיידסטאר). בלי מספרים שאינם ניתנים לאימות.',
                },
              },
              fields: [
                { name: 'value', type: 'text', required: true, label: { en: 'Value', he: 'ערך' } },
                { name: 'label', type: 'text', required: true, label: { en: 'Label', he: 'תווית' } },
              ],
            },
          ],
        },
        {
          label: { en: 'About', he: 'מי אנחנו' },
          fields: [
            { name: 'aboutEyebrow', type: 'text', label: { en: 'Eyebrow', he: 'כותרת עליונה' }, localized: true },
            { name: 'aboutTitle', type: 'text', label: { en: 'Title', he: 'כותרת' }, localized: true },
            { name: 'aboutBody', type: 'textarea', label: { en: 'Text', he: 'טקסט' }, localized: true },
            { name: 'aboutLinkLabel', type: 'text', label: { en: 'Link label', he: 'טקסט קישור' }, localized: true },
            {
              name: 'aboutImage',
              type: 'upload',
              label: { en: 'Photo', he: 'תמונה' },
              relationTo: 'media',
            },
          ],
        },
        {
          label: { en: 'Family stories', he: 'סיפורי משפחות' },
          fields: [
            { name: 'storiesEyebrow', type: 'text', label: { en: 'Eyebrow', he: 'כותרת עליונה' }, localized: true },
            { name: 'storiesTitle', type: 'text', label: { en: 'Title', he: 'כותרת' }, localized: true },
            { name: 'storiesDescription', type: 'textarea', label: { en: 'Description', he: 'תיאור' }, localized: true },
            {
              name: 'stories',
              type: 'array',
              label: { en: 'Video stories', he: 'סיפורי וידאו' },
              localized: true,
              maxRows: 6,
              admin: {
                description: {
                  en: 'Real videos from the charity’s channel. YouTube links (watch or shorts).',
                  he: 'סרטונים אמיתיים מערוץ העמותה. קישורי YouTube (רגילים או Shorts).',
                },
              },
              fields: [
                { name: 'videoUrl', type: 'text', required: true, label: { en: 'YouTube link', he: 'קישור YouTube' } },
                { name: 'title', type: 'text', required: true, label: { en: 'Title', he: 'כותרת' } },
                { name: 'description', type: 'textarea', label: { en: 'Description', he: 'תיאור' } },
                {
                  name: 'cover',
                  type: 'upload',
                  relationTo: 'media',
                  label: { en: 'Cover (optional)', he: 'תמונת שער (רשות)' },
                  admin: {
                    description: {
                      en: 'Optional custom cover; without it the YouTube thumbnail is used.',
                      he: 'שער מותאם; בלעדיו תוצג תמונת התצוגה של YouTube.',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: { en: 'Campaigns', he: 'קמפיינים' },
          fields: [
            { name: 'campaignsEyebrow', type: 'text', label: { en: 'Eyebrow', he: 'כותרת עליונה' }, localized: true },
            { name: 'campaignsTitle', type: 'text', label: { en: 'Title', he: 'כותרת' }, localized: true },
            { name: 'campaignsDescription', type: 'textarea', label: { en: 'Description', he: 'תיאור' }, localized: true },
          ],
        },
        {
          label: { en: 'Call to action', he: 'קריאה לפעולה' },
          fields: [
            { name: 'ctaTitle', type: 'text', label: { en: 'Title', he: 'כותרת' }, localized: true },
            { name: 'ctaDescription', type: 'textarea', label: { en: 'Description', he: 'תיאור' }, localized: true },
            { name: 'ctaPrimaryLabel', type: 'text', label: { en: 'Primary button', he: 'כפתור ראשי' }, localized: true },
            { name: 'ctaSecondaryLabel', type: 'text', label: { en: 'Secondary button', he: 'כפתור משני' }, localized: true },
          ],
        },
      ],
    },
  ],
}
