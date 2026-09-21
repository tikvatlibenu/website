# Brand foundations

**Tikvat Libenu (תקוות ליבנו — "the hope of our heart")** is an Israeli nonprofit that accompanies children with cancer and with cerebral palsy, and their families — medically, emotionally, socially and financially — from diagnosis to recovery. Tagline: **עוטפים את הכאב. בונים עתיד.** ("We wrap the pain. We build a future.")

## Personality

| We are | We are not |
|---|---|
| Warm, close, human | Sentimental, pitying |
| Hopeful and bright | Naïve or loud |
| Clear and trustworthy | Bureaucratic, clinical |
| Calm and confident | Urgent, guilt-driven |

The site has two audiences with different needs: **families** looking for help (often stressed, on a phone, at a hospital) and **donors / volunteers** deciding whether to trust us. Both are served by the same thing: clarity, calm, and visible humanity.

## The logo

A butterfly of four petals — pink, navy, yellow, teal — with a heart in the negative space at its centre; pink and yellow overlap into orange. Use the `Logo` component, never an image file.

- `variant="compact"` in the header, `variant="full"` (with tagline) in the footer and on "about" surfaces, `variant="mark"` for small spots.
- `tone="inverse"` on navy or photo backgrounds — the lettering and the navy wing turn white. Never place the colour logo on a saturated or busy background.
- Keep clear space of at least one petal-width around it. Don't recolour, rotate, outline or add effects.
- Minimum height: 28px (compact), 40px (full — the tagline stops being legible below that).

## The petal language

The logo's soft petal shape is the system's one decorative idea. It appears as: corner decor on tinted sections (`Section decor`), the icon chips of `ServiceCard` / `Stat` / `Steps`, the photo mask of `Hero` and `TeamCard` (`Picture shape="petal"`), the `ButterflyDecor` watermark, and the dots of `Divider variant="petals"`.

Use it sparingly — one decorative gesture per section. Petals are background; they never carry text and never sit on top of faces in photos.

Decor comes in exactly two forms:

1. **A field** — one large, soft petal that runs off an edge or corner of its section, so the edge crops it: `Section decor`, the white wing behind the `Hero` photo, a big `Petal` with negative offsets inside an `overflow: hidden` block.
2. **The butterfly** — `ButterflyDecor` as a pale watermark behind text (`Hero variant="centered"`, `CTABanner`), or once per page in full colour, perched on the corner of the hero photo (built into `Hero variant="split"`).

Never scatter small loose petals around a photo or a text block. A shape that touches no edge and belongs to nothing reads as a stain, not as decor. No drop shadows under petal-masked photos, and no blend modes on decor.

## Voice (Hebrew copy)

- Speak **to** people, in plural, gender-inclusive where natural: "תרמו", "הצטרפו", "צרו קשר"; slash forms only in forms ("אני מאשר/ת").
- Short sentences. Concrete over abstract: "₪180 — יום כיף שלם לילד ולמשפחתו", not "תרומתכם תסייע לפעילות".
- Hope, not fear. Say what becomes possible; don't dramatise illness.
- Families' privacy first: first names only ("מיכל, אמא של נועם"), no diagnoses next to a child's name or photo.
- Buttons are verbs: "לתרומה", "להרשמה", "לסיפור המלא", "שליחת הפנייה".
