# RTL & accessibility

The site is Hebrew, right-to-left, and — as an Israeli public-facing service — must meet **Israeli Standard 5568 (WCAG 2.0/2.1 AA)**. Both are built into the components; these are the rules for page code around them.

## RTL

1. Wrap everything in `<TikvatRoot>` (it sets `dir="rtl"` / `lang="he"`).
2. **Think start/end, not left/right.** Use logical CSS only: `margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start`, `border-start-start-radius`. Never `left` / `right` / `margin-left`.
3. Directional icons are named by meaning: `arrow-forward`, `arrow-back`, `chevron-forward`, `chevron-back`. They mirror automatically — "forward" points **left** in Hebrew. Never pick an arrow by its physical direction.
4. Layout order follows reading order: the first flex/grid child is on the **right**. The logo sits at the right of the header, the donate button at the left; in a split hero the text is on the right and the photo on the left.
5. LTR islands — phone numbers, e-mails, URLs, prices, times, Latin names — get `dir="ltr"` (or `dir="auto"` for mixed content) so digits and punctuation don't jump around.
6. Progress bars, steps, carousels and pagination all advance right → left.

## Accessibility checklist

- **Contrast**: text ≥ 4.5:1, large text and UI outlines ≥ 3:1. The semantic tokens already satisfy this; don't put text on a colour the tokens don't pair (see the Color guide).
- **Focus**: never remove the focus ring. It is a 3px navy outline with offset (yellow inside `.tl-on-dark`).
- **Targets**: interactive elements are at least 44×44px (`--tl-tap-target`). Buttons are 40/48/56px high.
- **Semantics**: one `h1` per page (the `Hero` title), levels don't skip; cards expose `headingLevel`. Use `Section aria-label` when a section has no visible heading. Lists of cards go in `<Grid as="ul">`.
- **Images**: meaningful photos need Hebrew `alt` text describing what is happening ("מתנדבת קוראת סיפור לילדה במחלקה"); decorative ones get `alt=""`. Petals and butterflies are already hidden from assistive tech.
- **Forms**: every field has a visible label (placeholders are examples, not labels); errors are text + icon, never colour alone; required fields are marked with `*` and explained.
- **Icon-only buttons** always get a `label` (`IconButton` enforces it).
- **Motion**: no autoplaying video or carousels; reduced-motion is honoured.
- **Language**: mark foreign-language fragments with `lang`.
- **Accessibility statement**: the footer's `legalLinks` must include "הצהרת נגישות" — it is a legal requirement in Israel.
