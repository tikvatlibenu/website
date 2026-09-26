/**
 * Seeds a fresh database with an admin user, site configuration and sample
 * bilingual content so the site is browsable immediately after setup.
 *
 * Run with:  pnpm seed
 * Safe to re-run: it skips anything that already exists.
 */
import './env'
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
      tagline: 'עוטפים את הכאב. בונים עתיד.',
      metaDescription:
        'עמותת תקוות ליבנו מלווה ילדים חולי סרטן וילדים עם שיתוק מוחין (CP), ואת משפחותיהם — רפואית, רגשית, חברתית וכלכלית, מרגע האבחון ועד ההחלמה.',
      contactEmail: 'tikvat789@gmail.com',
      contactPhone: '03-5044900',
      address: 'שבט זבולון 3, לוד',
      registrationNumber: '580705002',
      donatePageHeading: 'תרומה לקרן הכללית',
      donatePageIntro:
        'תרומתכם מממנת טיפולים ותרופות, ליווי רגשי וימי כיף לילדים ולמשפחותיהם.',
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      siteName: 'Tikvat Libenu',
      tagline: 'Wrapping the pain. Building a future.',
      metaDescription:
        'Tikvat Libenu walks with children fighting cancer and children with cerebral palsy (CP), and with their families — medically, emotionally, socially and financially, from diagnosis to recovery.',
      address: '3 Shevet Zvulun St., Lod',
      donatePageHeading: 'Donate to the general fund',
      donatePageIntro:
        'Your donation funds treatments and medicines, emotional care and fun days for the children and their families.',
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
      footerNote: 'עמותה רשומה מס׳ 580705002. אישור ניהול תקין בתוקף.',
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
        'Registered Israeli non-profit no. 580705002. Proper-management certificate in force.',
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
          title: 'עמותה רשומה עם ניהול תקין',
          description: 'ע״ר 580705002, אישור ניהול תקין בתוקף — ניתן לאימות בגיידסטאר.',
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
          title: 'Registered with proper management',
          description: 'Registered non-profit 580705002 with a proper-management certificate — verifiable on Guidestar.',
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

  // --- Home page ----------------------------------------------------------
  // Copy verified against the public NPO registry (Guidestar, ע"ר 580705002)
  // and the charity's own channel — no invented statistics or testimonials.
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'he',
    data: {
      heroEyebrow: 'עמותת תקוות ליבנו',
      heroTitle: 'עוטפים את הכאב.',
      heroTitleHighlight: 'בונים עתיד.',
      heroDescription:
        'מלווים ילדים חולי סרטן וילדים עם שיתוק מוחין (CP) — ואת המשפחות שלהם — רפואית, רגשית, חברתית וכלכלית, מרגע האבחון ועד ההחלמה. בכל רחבי הארץ.',
      heroPrimaryLabel: 'תרמו תקווה',
      heroSecondaryLabel: 'הכירו את העמותה',
      heroHighlights: [
        { value: '360°', label: 'ליווי רפואי, רגשי וכלכלי' },
        { value: 'יד ביד', label: 'מרגע האבחון ועד ההחלמה' },
        { value: 'בכל הארץ', label: 'בבתי החולים, בבית ובקהילה' },
      ],
      servicesEyebrow: 'מה אנחנו עושים',
      servicesTitle: 'הפעילות שלנו',
      servicesDescription: 'ליווי הוליסטי — רפואי, רגשי, חברתי וכלכלי — לאורך כל הדרך.',
      services: [
        {
          tone: 'teal',
          icon: 'stethoscope',
          title: 'סיוע רפואי וכלכלי',
          description:
            'מממנים תרופות חיוניות וטיפולים שאינם בסל הבריאות, ומקלים על הנטל הכלכלי של המשפחה.',
        },
        {
          tone: 'pink',
          icon: 'heart-handshake',
          title: 'ליווי רגשי קבוע',
          description:
            'אוזן קשבת ותמיכה רגשית להורים, לאחים ולילדים — באופן קבוע, לא רק ברגעי משבר.',
        },
        {
          tone: 'yellow',
          icon: 'users',
          title: 'מתנדבים לצד הילדים',
          description:
            'המתנדבים שלנו מגיעים אל הילדים בבתי החולים, בבית ובמסגרות החינוך — בכל רחבי הארץ.',
        },
        {
          tone: 'navy',
          icon: 'sun',
          title: 'ימי כיף ומחנות',
          description: 'ימי כיף, מחנות ונופשים בארץ ובחו״ל — רגעים של ילדות, חברים וצחוק.',
        },
      ],
      transparencyEyebrow: 'שקיפות',
      transparencyTitle: 'שקוף וגלוי',
      transparencyDescription: 'הנתונים מתוך המרשם הציבורי של רשם העמותות.',
      transparencyItems: [
        { value: 'ע״ר', label: 'עמותה רשומה 580705002' },
        { value: '2020', label: 'שנת ייסוד העמותה' },
        { value: '2026', label: 'אישור ניהול תקין בתוקף' },
      ],
      aboutEyebrow: 'מי אנחנו',
      aboutTitle: 'נעים להכיר: תקוות ליבנו',
      aboutBody:
        'תקוות ליבנו קמה כדי שאף משפחה לא תעבור את התקופה הקשה בחייה לבד. הצוות והמתנדבים שלנו נמצאים לצד הילדים והמשפחות בכל מקום שבו הם צריכים אותנו — בבית החולים, בבית ובקהילה.',
      aboutLinkLabel: 'לסיפור המלא',
      storiesEyebrow: 'סיפורי משפחות',
      storiesTitle: 'המשפחות מספרות',
      storiesDescription: 'סרטונים אמיתיים מתוך ערוץ העמותה.',
      stories: [
        {
          videoUrl: 'https://www.youtube.com/shorts/GJOLGrjQJXE',
          title: 'להציל אותי מהסרטן',
          description: 'סיפור אישי של מאבק — והליווי של העמותה לאורכו.',
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=k8i6l_sb5Zg',
          title: 'עזרה ותמיכה לחולי סרטן',
          description: 'כך נראה הליווי של תקוות ליבנו — בבית החולים ובבית.',
        },
        {
          videoUrl: 'https://www.youtube.com/shorts/eE0LidSAi-w',
          title: 'הסיפור של הילה',
          description: 'המסע של הילה ומשפחתה — מרגע האבחון ועד החיוך.',
        },
      ],
      campaignsEyebrow: 'קמפיינים פעילים',
      campaignsTitle: 'זיכרון שממשיך לעשות טוב',
      campaignsDescription:
        'קמפיינים שהוקמו לזכרם של ילדים אהובים. כל תרומה ממשיכה את דרכם ועוטפת משפחות נוספות.',
      ctaTitle: 'רוצים להיות חלק מהתקווה?',
      ctaDescription:
        'כל תרומה — קטנה או גדולה — עוטפת משפחה ברגע הכי קשה: מימון טיפולים ותרופות, ליווי רגשי וימי כיף לילדים.',
      ctaPrimaryLabel: 'לתרומה',
      ctaSecondaryLabel: 'צרו קשר',
    },
  })

  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      heroEyebrow: 'Tikvat Libenu',
      heroTitle: 'Wrapping the pain.',
      heroTitleHighlight: 'Building a future.',
      heroDescription:
        'We walk with children fighting cancer and children with cerebral palsy (CP) — and with their families — medically, emotionally, socially and financially, from diagnosis to recovery. All across Israel.',
      heroPrimaryLabel: 'Donate hope',
      heroSecondaryLabel: 'Meet the charity',
      heroHighlights: [
        { value: '360°', label: 'Medical, emotional & financial care' },
        { value: 'Hand in hand', label: 'From diagnosis to recovery' },
        { value: 'Nationwide', label: 'In hospitals, at home, in the community' },
      ],
      servicesEyebrow: 'What we do',
      servicesTitle: 'Our work',
      servicesDescription: 'Holistic support — medical, emotional, social and financial — all the way.',
      services: [
        {
          tone: 'teal',
          icon: 'stethoscope',
          title: 'Medical & financial aid',
          description:
            'Funding essential medicines and treatments not covered by public health insurance, easing the family’s financial burden.',
        },
        {
          tone: 'pink',
          icon: 'heart-handshake',
          title: 'Ongoing emotional care',
          description:
            'A listening ear and steady emotional support for parents, siblings and children — not only in moments of crisis.',
        },
        {
          tone: 'yellow',
          icon: 'users',
          title: 'Volunteers at the children’s side',
          description:
            'Our volunteers come to the children in hospitals, at home and at school — all across the country.',
        },
        {
          tone: 'navy',
          icon: 'sun',
          title: 'Fun days & camps',
          description:
            'Fun days, camps and getaways in Israel and abroad — moments of childhood, friends and laughter.',
        },
      ],
      transparencyEyebrow: 'Transparency',
      transparencyTitle: 'Open and accountable',
      transparencyDescription: 'Data from the public register of the Israeli Registrar of Non-Profits.',
      transparencyItems: [
        { value: 'Reg.', label: 'Registered charity 580705002' },
        { value: '2020', label: 'Year founded' },
        { value: '2026', label: 'Proper-management certificate in force' },
      ],
      aboutEyebrow: 'Who we are',
      aboutTitle: 'Meet Tikvat Libenu',
      aboutBody:
        'Tikvat Libenu exists so that no family goes through the hardest time of its life alone. Our team and volunteers stand beside the children and their families wherever they are needed — in hospital, at home and in the community.',
      aboutLinkLabel: 'Read our story',
      storiesEyebrow: 'Family stories',
      storiesTitle: 'Families speak',
      storiesDescription: 'Real videos from the charity’s channel.',
      stories: [
        {
          videoUrl: 'https://www.youtube.com/shorts/GJOLGrjQJXE',
          title: 'Save me from cancer',
          description: 'A personal story of a fight — and the charity’s support along the way.',
        },
        {
          videoUrl: 'https://www.youtube.com/watch?v=k8i6l_sb5Zg',
          title: 'Help and support for children with cancer',
          description: 'What Tikvat Libenu’s care looks like — in hospital and at home.',
        },
        {
          videoUrl: 'https://www.youtube.com/shorts/eE0LidSAi-w',
          title: 'Hila’s story',
          description: 'Hila and her family’s journey — from diagnosis to a smile.',
        },
      ],
      campaignsEyebrow: 'Active campaigns',
      campaignsTitle: 'A memory that keeps doing good',
      campaignsDescription:
        'Campaigns founded in memory of beloved children. Every donation carries their way forward and wraps more families.',
      ctaTitle: 'Want to be part of the hope?',
      ctaDescription:
        'Every donation — small or large — wraps a family at its hardest moment: funding treatments and medicines, emotional care and fun days for the children.',
      ctaPrimaryLabel: 'Donate',
      ctaSecondaryLabel: 'Contact us',
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
