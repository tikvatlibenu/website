# Page recipes

Compositions for the pages of tikvatlibenu.co.il. Each is a stack of `Section`s inside `TikvatRoot`, between `SiteHeader` and `SiteFooter`, with `FloatingContact` pinned on every page.

Header links (keep to 5–6): אודות · הפעילות שלנו · בלוג ומאמרים · גלריה · אישורים · צרו קשר — plus the pink **לתרומה** button.

## Home

1. `Hero variant="split"` — headline with one `Highlight`, one paragraph, "תרמו תקווה" + "הכירו את העמותה", three `highlights`.
2. `Section` — `SectionHeader` "הפעילות שלנו" + `Grid columns={4}` of `ServiceCard` (rotate tones teal → pink → yellow → navy).
3. `Section tone="navy"` — `StatGroup variant="plain"` with `Stat tone="inverse"` ("ההשפעה שלנו").
4. `Section tone="sky"` — about teaser: text + `Picture shape="petal"` in a 2-column `Grid`, `TextLink` to the about page.
5. `Section` — "סיפורי משפחות": `Grid columns={3}` of `TestimonialCard variant="tinted"`, or one `variant="feature"`.
6. `Section tone="sun"` — upcoming events: `Grid` of `EventCard`.
7. `Section` — videos: `Grid columns={3}` of `VideoCard`.
8. `Section` — latest articles: `SectionHeader` with `action` "לכל המאמרים" + `Grid columns={3}` of `ArticleCard`.
9. `Section spacing="compact"` — `CTABanner tone="navy"` "תרמו תקווה".

## Donate

`Hero variant="centered" tone="blush"` (short) → `Section`: 2-column `Grid` — left `DonationForm` with `impact`, right `CampaignProgress` + `Steps orientation="vertical"` ("בוחרים סכום → משלמים → מקבלים קבלה") → `Section tone="sky"`: trust row of `DocumentCard`s (ניהול תקין, סעיף 46) → `Accordion` FAQ about donations.

## Services / category page (e.g. "ליווי רפואי־חברתי")

`Breadcrumbs` → `Hero variant="centered"` or a `SectionHeader headingLevel={1}` → long-form text in `Container size="narrow"` with `Heading level={2}` + `Paragraph` → `Steps` ("מרגע האבחון → לאורך הטיפולים → עד ההחלמה") → related `ArticleCard`s → `Accordion` ("שאלות ותשובות") → `CTABanner tone="mint"` to contact.

## Blog index

`SectionHeader headingLevel={1}` → `Tabs variant="pills"` as category filter → `Grid columns={3}` of `ArticleCard` (first post may be `layout="horizontal"` spanning the row) → `Pagination`.

## Article

`Container size="narrow"`: `Breadcrumbs`, `Badge` category, `Heading level={1}`, meta `Paragraph size="xs" tone="muted"`, `Picture ratio="16/9"`, body paragraphs, `Divider variant="petals"`, author `Avatar`. Then "אולי יעניין אותך" `Grid` of `ArticleCard`, then `CTABanner`.

## Gallery

`SectionHeader` → `Tabs` (albums) → `Gallery layout="featured"` → more albums → `CTABanner tone="sun"`.

## Approvals ("אישורים")

`Hero variant="centered" tone="navy"` "כל שקל מגיע לאן שצריך" → `Stack` of `DocumentCard verified` → `StatGroup variant="card"` with transparency figures → contact CTA.

## About

`Hero variant="split"` → story text (`narrow`) → `Steps` (timeline of the amuta) → `Grid columns={4}` of `TeamCard` → `StatGroup` → `TestimonialCard variant="feature"` → `CTABanner`.

## Contact

2-column `Grid`: `ContactForm` + a `Card variant="tinted"` with phone / WhatsApp / e-mail / address (`Icon` rows, `FloatingContact fixed={false} showLabels`).
