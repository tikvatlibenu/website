/**
 * Sample bilingual content. The people below are illustrative placeholders so
 * the client can see the layout populated before real memorials are entered.
 */

export const faqSeeds = [
  {
    order: 1,
    he: {
      question: 'האם התרומה מוכרת לצורכי מס?',
      answer: [
        'כן. לעמותה אישור לפי סעיף 46 לפקודת מס הכנסה, ובסיום התרומה תישלח אליכם קבלה רשמית לכתובת הדואר האלקטרוני שהזנתם.',
      ],
    },
    en: {
      question: 'Are donations tax deductible?',
      answer: [
        'Yes. The association holds Section 46 approval under the Israeli income tax ordinance. An official receipt is emailed to you as soon as the donation is completed.',
      ],
    },
  },
  {
    order: 2,
    he: {
      question: 'לאן מגיע הכסף שאני תורם?',
      answer: [
        'תרומה שנעשתה בעמוד הנצחה מסוים מועברת במלואה למשפחה שאליה משויך העמוד. תרומה לקרן הכללית מחולקת בין המשפחות הנתמכות לפי צורכיהן.',
      ],
    },
    en: {
      question: 'Where does my donation go?',
      answer: [
        'A donation made on a specific memorial page is passed in full to that family. A donation to the general fund is distributed among the families we support according to need.',
      ],
    },
  },
  {
    order: 3,
    he: {
      question: 'האם התשלום מאובטח?',
      answer: [
        'התרומה מתבצעת בטופס של ספק סליקה מורשה, בתקן PCI DSS. פרטי האשראי אינם עוברים דרך האתר שלנו ואינם נשמרים אצלנו.',
      ],
    },
    en: {
      question: 'Is the payment secure?',
      answer: [
        'Donations are processed in a form hosted by a licensed, PCI DSS compliant payment provider. Card details never pass through our website and are never stored by us.',
      ],
    },
  },
  {
    order: 4,
    he: {
      question: 'כיצד משפחה יכולה לבקש עמוד הנצחה?',
      answer: [
        'פנו אלינו דרך עמוד יצירת הקשר ונחזור אליכם. הקמת עמוד היא ללא עלות, ואתם מחליטים אילו תמונות, מילים וסרטונים יופיעו בו.',
      ],
    },
    en: {
      question: 'How can a family request a memorial page?',
      answer: [
        'Get in touch through the contact page and we will reply. Creating a page is free of charge, and the family decides which photographs, words and videos appear on it.',
      ],
    },
  },
  {
    order: 5,
    he: {
      question: 'האפשר לתרום מחוץ לישראל?',
      answer: [
        'כן. טופס התרומה תומך בכרטיסי אשראי בינלאומיים. אם נתקלתם בקושי, כתבו אלינו ונשמח לסייע.',
      ],
    },
    en: {
      question: 'Can I donate from outside Israel?',
      answer: [
        'Yes. The donation form accepts international cards. If you run into any difficulty, write to us and we will be glad to help.',
      ],
    },
  },
]

export const campaignSeeds = [
  {
    slug: 'noam-ben-ari',
    initials: 'נ',
    hue: 214,
    featured: true,
    order: 1,
    dateOfBirth: '2001-04-12T00:00:00.000Z',
    dateOfDeath: '2023-10-07T00:00:00.000Z',
    he: {
      title: 'נועם בן ארי',
      excerpt: 'בן 22, מוזיקאי, אח גדול. אהב לנגן בגיטרה במרפסת בשעות הערב.',
      body: [
        'נועם נולד בחיפה, הבכור מבין שלושה. מגיל צעיר לא הלך לשום מקום בלי הגיטרה שלו.',
        'חבריו מספרים שהוא היה זה שתמיד נשאר אחרון, מקפל כיסאות, בודק שכולם הגיעו הביתה. הוא רצה ללמוד הנדסת קול.',
        'המשפחה הקימה קרן על שמו שמסייעת לצעירים ללמוד מוזיקה.',
      ],
    },
    en: {
      title: 'Noam Ben Ari',
      excerpt: 'Twenty-two, a musician, an older brother. He loved playing guitar on the balcony at dusk.',
      body: [
        'Noam was born in Haifa, the eldest of three. From a young age he went nowhere without his guitar.',
        'His friends say he was always the last to leave, folding the chairs, checking that everyone had made it home. He wanted to study sound engineering.',
        'His family established a fund in his name that helps young people study music.',
      ],
    },
  },
  {
    slug: 'yael-cohen',
    initials: 'י',
    hue: 268,
    featured: true,
    order: 2,
    dateOfBirth: '1996-09-03T00:00:00.000Z',
    dateOfDeath: '2023-10-07T00:00:00.000Z',
    he: {
      title: 'יעל כהן',
      excerpt: 'מורה לחינוך מיוחד. הכיתה שלה קראה לה "יעלי".',
      body: [
        'יעל לימדה שבע שנים בבית ספר לחינוך מיוחד בבאר שבע, וכל בוקר הגיעה ראשונה.',
        'היא האמינה שלכל ילד יש דרך פנימה, ורק צריך סבלנות למצוא אותה.',
        'הקרן על שמה מממנת ציוד טיפולי לכיתות חינוך מיוחד בדרום.',
      ],
    },
    en: {
      title: 'Yael Cohen',
      excerpt: 'A special education teacher. Her class called her Yaeli.',
      body: [
        'Yael taught for seven years at a special education school in Beersheba, and every morning she was the first to arrive.',
        'She believed every child has a way in, and that it only takes patience to find it.',
        'The fund in her name pays for therapeutic equipment in special education classrooms across southern Israel.',
      ],
    },
  },
  {
    slug: 'itay-mizrahi',
    initials: 'א',
    hue: 190,
    featured: true,
    order: 3,
    dateOfBirth: '2004-01-27T00:00:00.000Z',
    dateOfDeath: '2024-01-15T00:00:00.000Z',
    he: {
      title: 'איתי מזרחי',
      excerpt: 'בן 20 מרמת גן. שחקן כדורסל, וצייר בסתר.',
      body: [
        'איתי גדל על מגרש הכדורסל השכונתי, ורק מעטים ידעו שבבית הוא ממלא מחברות בציורים.',
        'אחרי לכתו מצאה המשפחה עשרות רישומים בתיק הגב שלו. חלקם מוצגים כעת בעמוד הזה.',
        'התרומות בעמוד זה מסייעות לאחיו הצעירים להמשיך בלימודיהם.',
      ],
    },
    en: {
      title: 'Itay Mizrahi',
      excerpt: 'Twenty years old, from Ramat Gan. A basketball player, and a secret illustrator.',
      body: [
        'Itay grew up on the neighbourhood basketball court, and few people knew that at home he filled notebooks with drawings.',
        'After he was gone his family found dozens of sketches in his backpack. Some of them are shown on this page.',
        'Donations made here help his younger brothers continue their studies.',
      ],
    },
  },
]
