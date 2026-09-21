# Color

Five hues, all sampled from the logo. Every hue has a 50–900 scale (`--tl-color-<hue>-<step>`), but components and page code should use the **semantic tokens**.

| Hue | Brand value | Role |
|---|---|---|
| Navy | `--tl-color-navy-800` `#1E1F63` | All text, dark surfaces, secondary buttons. The "ink" of the brand. |
| Pink | `--tl-color-pink-500` `#F41D5A` | The heart. Donate / primary actions use `--tl-color-primary` (= pink-600, AA with white text). |
| Yellow | `--tl-color-yellow-400` `#FFC63A` | Light and hope: highlights, accents on navy. |
| Orange | `--tl-color-orange-500` `#FE9A0C` | Warm secondary accent, progress gradients. |
| Teal | `--tl-color-teal-400` `#41C4AF` | Calm, care, success. Text uses teal-700. |

## Semantic tokens to reach for

- Text: `--tl-color-text` (navy) · `--tl-color-text-secondary` (grey, body support) · `--tl-color-text-muted` (meta) · `--tl-color-text-inverse`
- Surfaces: `--tl-color-bg` · `--tl-color-bg-soft` · `--tl-color-surface-sky | -blush | -sun | -mint` (pale tints) · `--tl-color-bg-inverse` (navy)
- Actions: `--tl-color-primary` / `-hover` / `-active` / `-soft`, `--tl-color-secondary` / `-hover` / `-soft`
- Borders: `--tl-color-border` (dividers) · `--tl-color-border-strong` (cards, chips) · `--tl-color-border-input` (3:1 for form controls)
- Feedback: `--tl-color-success|warning|danger|info` with matching `-bg`
- Focus: `--tl-color-focus` (switches to yellow inside `.tl-on-dark`)

## Proportions

Aim for roughly **70% white / pale tints, 20% navy, 10% bright accents**. A page is mostly white with navy text; tinted sections (`Section tone="sky|blush|sun|mint"`) break the rhythm; one navy band (stats or CTA) anchors it; pink is reserved for the action you most want.

## Rules

1. **One pink primary button per view.** Everything else is `secondary`, `outline`, `soft` or `ghost`.
2. **Text is navy or grey — never teal-400, yellow or orange on white** (they fail contrast, and darkening them only gives a muddy brown). Yellow and orange are **fills only** — marker strokes, icon chips, date tiles, badges — and their text partner is always navy. `Stat tone="yellow"` is the pattern: a navy number on a yellow marker stroke.
3. **On navy**: text white, supporting text `--tl-color-text-inverse-muted`, accents yellow-400 or teal-300. Wrap custom dark blocks in `className="tl-on-dark"` so tokens, links and focus rings flip.
4. Rotate accent tones across repeated items (pink → teal → yellow → navy) the way the petals do; don't make a row of four pink cards.
5. Red (`--tl-color-danger`) is for errors only. It is deliberately not the brand pink.
6. No gradients on text; gradients only in `ProgressBar` fills and the pink `CTABanner`.

## Contrast reference (WCAG)

| Pair | Ratio |
|---|---|
| navy-800 on white | 14.7 : 1 |
| gray-600 (secondary text) on white | 6.6 : 1 |
| gray-500 (muted text) on white | 4.9 : 1 |
| white on pink-600 (primary button) | 5.1 : 1 |
| white on pink-500 (brand pink) | 4.1 : 1 — large text only |
| navy-800 on yellow-400 | 9.4 : 1 |
| navy-800 on teal-400 | 6.8 : 1 |
| teal-700 on white | 6.4 : 1 |
| yellow-400 on navy-800 | 9.4 : 1 |
