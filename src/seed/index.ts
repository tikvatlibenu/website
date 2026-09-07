/**
 * Seeds a fresh database with an admin user, site configuration and sample
 * bilingual content so the site is browsable immediately after setup.
 *
 * Run with:  pnpm seed
 * Safe to re-run: it skips anything that already exists.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { richText } from './richText'
import { makePlaceholderImage } from './placeholder'
import { campaignSeeds, faqSeeds } from './content'

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@tikvatlibenu.co.il'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'

async function seed() {
  const payload = await getPayload({ config })

  // --- Admin user ---------------------------------------------------------
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'Tikvatlibenu Admin' },
    })
    payload.logger.info(`Created admin user ${ADMIN_EMAIL} (password: ${ADMIN_PASSWORD})`)
  } else {
    payload.logger.info('Admin user already exists, skipping.')
  }

  // --- Site settings ------------------------------------------------------
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'he',
    data: {
      siteName: 'תקוות ליבנו',
      tagline: 'מנציחים את יקירינו, ותומכים במשפחות שנותרו מאחור.',
      metaDescription:
        'עמותת תקוות ליבנו מנציחה את זכרם של הנופלים ומסייעת למשפחותיהם. כל תרומה מגיעה ישירות למשפחה.',
      contactEmail: 'info@tikvatlibenu.co.il',
      contactPhone: '+972 3 000 0000',
      address: 'רחוב הרצל 1\nתל אביב-יפו',
      donatePageHeading: 'תרומה לקרן הכללית',
      donatePageIntro:
        'תרומתכם מחולקת בין המשפחות הנתמכות. התרומה מוכרת לצורכי מס לפי סעיף 46.',
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      siteName: 'Tikvatlibenu',
      tagline: 'Honouring those we lost, standing with the families they left behind.',
      metaDescription:
        'Tikvatlibenu keeps the memory of the fallen alive and supports the families they left behind. Every donation reaches a family directly.',
      address: '1 Herzl Street\nTel Aviv-Yafo',
      donatePageHeading: 'Donate to the general fund',
      donatePageIntro:
        'Your donation is distributed among the families we support. Donations are tax deductible in Israel under Section 46.',
    },
  })

  // --- Navigation ---------------------------------------------------------
  await payload.updateGlobal({
    slug: 'navigation',
    locale: 'he',
    data: {
      headerLinks: [
        { label: 'הנצחות', url: '/campaigns' },
        { label: 'אודות', url: '/about' },
        { label: 'שאלות נפוצות', url: '/faq' },
        { label: 'צור קשר', url: '/contact' },
      ],
      headerCta: { label: 'לתרומה', url: '/donate' },
      footerLinks: [
        { label: 'הנצחות', url: '/campaigns' },
        { label: 'אודות', url: '/about' },
        { label: 'שאלות נפוצות', url: '/faq' },
        { label: 'צור קשר', url: '/contact' },
      ],
      footerNote: 'עמותה רשומה. תרומות מוכרות לצורכי מס לפי סעיף 46 לפקודת מס הכנסה.',
    },
  })

  await payload.updateGlobal({
    slug: 'navigation',
    locale: 'en',
    data: {
      headerLinks: [
        { label: 'Memorials', url: '/campaigns' },
        { label: 'About', url: '/about' },
        { label: 'FAQ', url: '/faq' },
        { label: 'Contact', url: '/contact' },
      ],
      headerCta: { label: 'Donate', url: '/donate' },
      footerLinks: [
        { label: 'Memorials', url: '/campaigns' },
        { label: 'About', url: '/about' },
        { label: 'FAQ', url: '/faq' },
        { label: 'Contact', url: '/contact' },
      ],
      footerNote:
        'A registered Israeli non-profit. Donations are tax deductible under Section 46.',
    },
  })

  // --- About page ---------------------------------------------------------
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'he',
    data: {
      title: 'אודות תקוות ליבנו',
      intro:
        'נולדנו מתוך כאב, ומתוך אמונה שזיכרון הוא מעשה. אנחנו מלווים משפחות שכולות ומנציחים את יקיריהן.',
      body: richText([
        'תקוות ליבנו הוקמה על ידי משפחות שאיבדו את היקר להן מכל. מתוך הכאב הזה צמחה החלטה פשוטה: שאף משפחה לא תישאר לבד.',
        'אנחנו בונים לכל נשמה עמוד הנצחה משלה, שבו נאספים הסיפור, התמונות והמילים של מי שאהבו אותה. לצד ההנצחה פועלת קרן ייעודית, כך שכל מי שנוגע בסיפור יכול גם לתמוך במשפחה באופן ישיר.',
        'שקיפות היא עיקרון יסוד אצלנו. כל שקל נרשם, מדווח, ומועבר ליעדו.',
      ]),
      trustPoints: [
        {
          title: 'תרומה מוכרת לצורכי מס',
          description: 'העמותה מחזיקה באישור לפי סעיף 46 לפקודת מס הכנסה.',
        },
        {
          title: 'הכסף מגיע למשפחה',
          description: 'תרומה לעמוד הנצחה מסוים מועברת במלואה למשפחה שאליה הוא משויך.',
        },
        {
          title: 'סליקה מאובטחת',
          description: 'התרומות מתבצעות אצל ספק סליקה מורשה, ואיננו שומרים פרטי אשראי.',
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    data: {
      title: 'About Tikvatlibenu',
      intro:
        'Born out of grief, and out of a belief that remembrance is an act. We walk with bereaved families and keep their loved ones present.',
      body: richText([
        'Tikvatlibenu was founded by families who lost what was dearest to them. Out of that pain came a simple resolve: no family should be left alone.',
        'For every soul we build a dedicated memorial page gathering their story, their photographs and the words of those who loved them. Alongside it runs a dedicated fund, so anyone moved by the story can support that family directly.',
        'Transparency is a founding principle. Every shekel is recorded, reported and passed on.',
      ]),
      trustPoints: [
        {
          title: 'Tax deductible',
          description: 'The association holds Section 46 approval under the Israeli tax ordinance.',
        },
        {
          title: 'Funds reach the family',
          description:
            'A donation made on a specific memorial page is passed in full to that family.',
        },
        {
          title: 'Secure payments',
          description:
            'Donations are processed by a licensed payment provider. We never store card details.',
        },
      ],
    },
  })

  // --- FAQs ---------------------------------------------------------------
  const existingFaqs = await payload.find({ collection: 'faqs', limit: 1 })
  if (existingFaqs.totalDocs === 0) {
    for (const faq of faqSeeds) {
      const created = await payload.create({
        collection: 'faqs',
        locale: 'he',
        data: { question: faq.he.question, answer: richText(faq.he.answer), order: faq.order },
      })
      await payload.update({
        collection: 'faqs',
        id: created.id,
        locale: 'en',
        data: { question: faq.en.question, answer: richText(faq.en.answer) },
      })
    }
    payload.logger.info(`Seeded ${faqSeeds.length} FAQs.`)
  } else {
    payload.logger.info('FAQs already exist, skipping.')
  }

  // --- Campaigns ----------------------------------------------------------
  const existingCampaigns = await payload.find({ collection: 'campaigns', limit: 1 })
  if (existingCampaigns.totalDocs === 0) {
    for (const campaign of campaignSeeds) {
      const media = await payload.create({
        collection: 'media',
        locale: 'he',
        data: { alt: campaign.he.title },
        file: {
          data: await makePlaceholderImage(campaign.initials, campaign.hue),
          name: `${campaign.slug}-cover.jpg`,
          mimetype: 'image/jpeg',
          size: 0,
        },
      })
      await payload.update({
        collection: 'media',
        id: media.id,
        locale: 'en',
        data: { alt: campaign.en.title },
      })

      const created = await payload.create({
        collection: 'campaigns',
        locale: 'he',
        data: {
          title: campaign.he.title,
          slug: campaign.slug,
          status: 'published',
          featured: campaign.featured,
          order: campaign.order,
          dateOfBirth: campaign.dateOfBirth,
          dateOfDeath: campaign.dateOfDeath,
          excerpt: campaign.he.excerpt,
          description: richText(campaign.he.body),
          coverImage: media.id,
          donationHeading: 'תרומה לזכרו',
        },
      })

      await payload.update({
        collection: 'campaigns',
        id: created.id,
        locale: 'en',
        data: {
          title: campaign.en.title,
          excerpt: campaign.en.excerpt,
          description: richText(campaign.en.body),
          donationHeading: 'Donate in their memory',
        },
      })
    }
    payload.logger.info(`Seeded ${campaignSeeds.length} campaigns.`)
  } else {
    payload.logger.info('Campaigns already exist, skipping.')
  }

  payload.logger.info('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
