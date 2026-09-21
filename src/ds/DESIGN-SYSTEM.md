# Tikvat Libenu design system — conventions

Design system of **תקוות ליבנו** (Tikvat Libenu), an Israeli nonprofit accompanying children with cancer and their families. Everything you build is **Hebrew, right-to-left**, warm, clean and hopeful — never clinical, never pitying. All UI copy is Hebrew; write real, specific copy (no lorem ipsum).

## 1. Setup — always wrap in `TikvatRoot`

```jsx
const { TikvatRoot, SiteHeader, Hero, Section, SiteFooter } = window.TikvatUI;
<TikvatRoot>{/* whole page */}</TikvatRoot>
```

`TikvatRoot` sets `dir="rtl"`, `lang="he"`, the Polin font, navy text colour and box-sizing/margin resets. Without it text falls back to a system font, layouts run left-to-right and arrows point the wrong way. Use it exactly once, at the top.

- A page = `SiteHeader` → `Hero` → a stack of `Section`s → `SiteFooter`, plus `FloatingContact`. `Section` owns vertical padding and wraps content in a `Container`; open it with `SectionHeader`.
- Dark surfaces: `Section tone="navy"`, `Card variant="navy"`, `CTABanner`, `SiteFooter` flip text/links/focus rings themselves. For your own dark block add `className="tl-on-dark"`. Visually hidden text: `className="tl-sr-only"`.

## 2. Styling idiom — components + CSS variables

There are **no utility classes**. Compose with the layout components (`Stack gap={4}`, `Grid columns={3}`, `Container size="narrow"`, `Section tone="sky"`) and, for your own glue, inline styles that read tokens: `style={{ padding: 'var(--tl-space-6)', borderRadius: 'var(--tl-radius-lg)' }}`. Never hard-code hex colours, px font sizes or a font family.

| Family | Tokens |
|---|---|
| Text | `--tl-color-text` (navy) · `--tl-color-text-secondary` · `--tl-color-text-muted` · `--tl-color-text-inverse` · `--tl-color-text-link` |
| Surfaces | `--tl-color-bg` · `--tl-color-bg-soft` · `--tl-color-surface-sky` · `--tl-color-surface-blush` · `--tl-color-surface-sun` · `--tl-color-surface-mint` · `--tl-color-bg-inverse` (navy) |
| Actions | `--tl-color-primary` (pink, donate) · `--tl-color-primary-soft` · `--tl-color-secondary` (navy) |
| Borders | `--tl-color-border` · `--tl-color-border-strong` · `--tl-color-border-input` |
| Brand hues | `--tl-color-navy-800` · `--tl-color-pink-500` · `--tl-color-yellow-400` · `--tl-color-orange-500` · `--tl-color-teal-400` (each has a 50–900 scale) |
| Feedback | `--tl-color-success` · `--tl-color-warning` · `--tl-color-danger` · `--tl-color-info` (+ `-bg`) |
| Type | `--tl-font-family` · `--tl-font-size-display | h1 | h2 | h3 | h4 | h5 | lead | body | sm | xs` · `--tl-font-weight-regular | medium | semibold | bold | extrabold | black` |
| Space | `--tl-space-1 … -6, -8, -10, -12, -16, -20, -24, -32` (4px base) · `--tl-gutter` · `--tl-section-space` |
| Shape | `--tl-radius-sm | md | lg | xl | 2xl | pill` · `--tl-shape-petal-a | b | c` · `--tl-shadow-sm | md | lg` |

Rules that keep it on-brand:
- **One pink `Button variant="primary"` per view** (usually "לתרומה" with `iconStart="heart"`); others are `secondary`, `outline`, `soft`, `ghost`; on dark use `inverse` / `inverse-outline`.
- Text is navy or grey. Never put text in teal-400, yellow or orange on white; on those fills text is navy.
- Rotate accent `tone`s across repeated cards (teal → pink → yellow → navy); alternate `Section` tones white → tint → white → navy.
- Logical CSS only (`marginInlineStart`, `paddingInline`, `insetInlineEnd`, `textAlign: 'start'`) — never left/right.
- Icons are chosen by name and meaning: `arrow-forward` / `chevron-back` mirror automatically (forward points **left** in Hebrew). Full name list: `components/icons/Icon/Icon.prompt.md`.
- Numbers, phones, e-mails, prices, times are LTR islands: `<span dir="ltr">03-5044900</span>`; prices as `₪180`.
- No photo yet? Omit `src` / `imageSrc` — `Picture` (and every card that contains one) renders a branded butterfly placeholder. Don't hot-link stock photos.
- Headings: one `h1` per page (the `Hero` title); emphasise one or two words with `<Highlight>`.
- Decor is never loose spots. Use what is built in — `Hero` draws its own wing field and perched butterfly, `Section decor` adds edge-cropped corner petals, `CTABanner` has a butterfly watermark. If you add a `Petal` yourself, make it one big shape (200px+) pushed past an edge of an `overflow: hidden` block; don't scatter small petals around photos or text.

## 3. Where the truth lives

- `tokens/colors.css`, `tokens/typography.css`, `tokens/layout.css` — every token with comments. Read before styling.
- `guidelines/docs/guides/` — brand & voice, color, typography, layout, RTL & accessibility, **`06-page-recipes.md`** (section-by-section recipes for Home, Donate, Blog, Article, Gallery, Approvals, About, Contact), content & imagery.
- `components/<group>/<Name>/<Name>.prompt.md` — props and verified examples for each component.

## 4. Idiomatic snippet

```jsx
const { TikvatRoot, SiteHeader, Hero, Highlight, Section, SectionHeader, Grid, ServiceCard, CTABanner, SiteFooter, FloatingContact } = window.TikvatUI;

<TikvatRoot>
  <SiteHeader donateHref="#donate" links={[{ label: 'אודות', href: '#about' }, { label: 'הפעילות שלנו', href: '#services', current: true }, { label: 'צרו קשר', href: '#contact' }]} />
  <Hero
    eyebrow="עמותת תקוות ליבנו"
    title={<>עוטפים את הכאב. <Highlight>בונים עתיד.</Highlight></>}
    description="מלווים ילדים חולי סרטן ומשפחותיהם — מרגע האבחון ועד ההחלמה."
    primaryAction={{ label: 'תרמו תקווה', href: '#donate', icon: 'heart' }}
    secondaryAction={{ label: 'הכירו את העמותה', href: '#about' }}
  />
  <Section tone="white">
    <SectionHeader eyebrow="הפעילות שלנו" title="מעטפת מלאה לילד ולמשפחה" />
    <Grid columns={3}>
      <ServiceCard icon="stethoscope" tone="teal" title="ליווי רפואי־חברתי" description="הכוונה מול בתי החולים וסיוע בבירוקרטיה." />
      <ServiceCard icon="heart-handshake" tone="pink" title="תמיכה רגשית" description="ליווי פסיכולוגי לילד, להורים ולאחים." />
      <ServiceCard icon="party" tone="yellow" title="ימי כיף ואירועים" description="רגעים של שמחה והפוגה מהשגרה הרפואית." />
    </Grid>
  </Section>
  <Section spacing="compact">
    <CTABanner title="תרמו תקווה" description="כל תרומה מוכרת לצורכי מס לפי סעיף 46." primaryAction={{ label: 'לתרומה מאובטחת', href: '#donate', icon: 'heart' }} />
  </Section>
  <SiteFooter columns={[{ title: 'העמותה', links: [{ label: 'אודות', href: '#about' }] }]} phone="03-5044900" legalLinks={[{ label: 'הצהרת נגישות', href: '#accessibility' }]} />
  <FloatingContact whatsapp="97235044900" phone="03-5044900" />
</TikvatRoot>
```

# TikvatUI (@tikvat-libenu/ui@0.1.0)

This design system is the published @tikvat-libenu/ui React library, bundled as a single
browser global. All 54 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.TikvatUI`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).
- `guidelines/` — the design system's own usage guidance (7 doc(s), see `guidelines/index.md`). Read these before composing larger layouts.

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.TikvatUI.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { Accordion } = window.TikvatUI;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<Accordion />);
```

Wrap the tree in the provider — most components read theme/i18n from context:

```jsx
<TikvatRoot>{children}</TikvatRoot>
```

## Tokens

186 CSS custom properties from @tikvat-libenu/tokens. Names are
preserved verbatim from upstream. See `tokens/` for the full list.

- **color** (109): `--tl-color-navy-50`, `--tl-color-navy-100`, `--tl-color-navy-200`, …
- **spacing** (16): `--tl-space-0`, `--tl-space-1`, `--tl-space-2`, …
- **typography** (26): `--tl-font-family`, `--tl-font-weight-light`, `--tl-font-weight-regular`, …
- **radius** (7): `--tl-radius-xs`, `--tl-radius-sm`, `--tl-radius-md`, …
- **shadow** (6): `--tl-shadow-xs`, `--tl-shadow-sm`, `--tl-shadow-md`, …
- **other** (22): `--tl-container-narrow`, `--tl-container`, `--tl-container-wide`, …

## Components

### disclosure
- `Accordion` — Expandable question-and-answer list for FAQ blocks. Keyboard and screen-reader friendly.

### feedback
- `Alert` — Inline message for form results and important notices: info, success, warning, danger. Errors are announced to screen readers.
- `Dialog` — Modal window over a navy veil for donation thank-you, video player and confirmations. Closes on Escape and outside click.

### cards
- `ArticleCard` — Blog teaser: photo, category badge, date, title, excerpt and a read-more cue. The entire card is one link.
- `Card` — The base surface: a soft, generously rounded container (elevated, outlined, tinted or navy). Specialised cards build on it.
- `DocumentCard` — Downloadable official document (proper-management certificate, section 46 approval, annual report) with a verified check.
- `EventCard` — Upcoming fun day, meet-up or fundraiser: coloured date tile, title, time, place, optional photo and status badge.
- `ServiceCard` — Describes one thing the amuta does: petal icon chip, title, short text, optional link. Rotate tones across a row.
- `TeamCard` — Staff, board member or volunteer: portrait in a petal or circle frame, name, role, short bio.
- `TestimonialCard` — A family's or volunteer's words: quote, name and role with avatar. Card, tinted or large centred feature variant.
- `VideoCard` — Video teaser with a big round play button over the poster frame, duration chip and title. Landscape or vertical.

### media
- `Avatar` — Round portrait for staff, volunteers and quoted family members. Shows initials on a logo colour when there is no photo.
- `Gallery` — Photo grid for events and activity days: equal tiles or a featured first photo. Tiles become buttons when onImageClick is set.
- `Picture` — Photo frame with brand corner shapes and fixed ratios. Shows a branded butterfly placeholder when there is no src.

### data-display
- `Badge` — Small pill label for article categories, event status and 'new' markers. Soft, solid or outline in the logo colours.
- `ProgressBar` — Horizontal progress bar with a gradient fill (fills from the right in Hebrew) for fundraising goals and multi-step forms.
- `Stat` — One impact figure: a big Polin Black number with a short label and optional petal icon chip. Group several in a StatGroup.
- `StatGroup` — Lays out a row of Stat figures - the impact-in-numbers strip. Plain, white card or navy band.

### navigation
- `Breadcrumbs` — You-are-here trail at the top of inner pages, with direction-aware separators.
- `Pagination` — Page navigation for the blog and gallery archives: previous, numbered pages, next - direction-aware.
- `SiteFooter` — Navy page footer: full logo with tagline, mission line, link columns, contact details, social links and legal small print.
- `SiteHeader` — The site's top bar: logo, main navigation and the pink donate button. Collapses into a menu panel when narrower than 960px.
- `Tabs` — Switches between content panels, or filters a list by category (pills or underline). Arrow keys move between tabs.

### brand
- `ButterflyDecor` — The butterfly mark as a large decorative watermark for hero, banner and card backgrounds. Purely ornamental.
- `Logo` — The Tikvat Libenu logo as crisp vector: full, compact, mark or wordmark - in colour, inverse (for dark surfaces) or mono.
- `Petal` — A single soft petal shape from the butterfly logo - background decor only. Use it large and let a section edge crop it, never as loose spots

### actions
- `Button` — Pill-shaped action button. Pink primary is reserved for the single most important action - usually donating.
- `IconButton` — Round icon-only button for carousel arrows, close, menu toggle and social links. Always needs a label.

### donation
- `CampaignProgress` — Fundraising thermometer: raised vs goal with a gradient bar, donor count, days left and a donate button.
- `DonationForm` — The donation widget: monthly / one-time switch, preset amounts with a live impact line, custom amount, pink submit, secure note.

### forms
- `Checkbox` — Checkbox with a large hit area for consents and multi-choice lists. The label may contain links.
- `ChipGroup` — Tappable pill choices for interests, donation purposes and quick filters. Single- or multi-select.
- `ContactForm` — Ready-made contact form: name, phone, e-mail, topic, message, consent - with labels, states and success / error messages.
- `RadioGroup` — One-of-many choice as plain radios or bordered cards, inside a fieldset with a legend.
- `SelectField` — Native dropdown (best on phones and with screen readers) dressed in the brand field style.
- `TextareaField` — Multi-line text input for messages and stories, with the same label / hint / error anatomy as TextField.
- `TextField` — Single-line text input with label, hint, error line and optional icon. E-mail, phone and URL values are typed left-to-right.

### foundations
- `Container` — Centers content at the page width (narrow 760, default 1200, wide 1360) and adds the responsive side gutters.
- `Divider` — Separates content: a quiet hairline, or four petal dots in the logo colours.
- `Grid` — Responsive grid: up to N equal columns that collapse on their own as space runs out - no breakpoints needed.
- `Section` — Full-width page band with brand background tones, consistent vertical rhythm and an inner Container.
- `Stack` — Flex layout helper: stacks children in a column or row with a token-based gap.
- `TikvatRoot` — Page root: sets RTL direction, the Polin font, brand text colour and base resets. Wrap every page or fragment in it once.

### sections
- `CTABanner` — Rounded call-to-action band that closes a page or interrupts a long one. Navy, pink gradient, sun or mint.
- `Hero` — Opening block of a page: big Polin headline, one paragraph, up to two buttons, and a photo in a petal frame with a perched butterfly. Split,
- `SectionHeader` — Standard opening of a page section: eyebrow, title, short description and an optional action at the far side.
- `Steps` — A short numbered sequence (horizontal or vertical timeline) with petal markers - how we accompany a family, how to donate.

### typography
- `Eyebrow` — Small bold label with a petal marker that sits above a heading and names the section.
- `Heading` — Page and section titles in Polin Bold/Extrabold, h1-h6 with independent visual size. Combine with Highlight for key words.
- `Highlight` — Inline emphasis for one or two key words inside a Heading: marker stroke, drawn underline, or brand colour.
- `Paragraph` — Body copy in Polin Regular: 18px with generous leading by default, tuned for long Hebrew text. Sizes lead, body, sm, xs.
- `TextLink` — Text hyperlink: inline inside copy, or a standalone read-more link with a direction-aware arrow.

### utilities
- `FloatingContact` — Always-reachable contact shortcuts: round WhatsApp and phone buttons pinned to a bottom corner of every page.

### icons
- `Icon` — Line icon from the curated set (lucide outlines + WhatsApp, Facebook, Instagram, YouTube). Inherits text colour, arrows mirror in RTL.
