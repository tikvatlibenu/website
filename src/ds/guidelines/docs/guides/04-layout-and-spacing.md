# Layout, spacing, shape

## Page skeleton

```jsx
<TikvatRoot>
  <SiteHeader … />
  <main>
    <Hero … />
    <Section> … </Section>
    <Section tone="sky"> … </Section>
    <Section tone="navy"> … </Section>
  </main>
  <SiteFooter … />
  <FloatingContact … />
</TikvatRoot>
```

- `TikvatRoot` once, at the top: sets `dir="rtl"`, `lang="he"`, Polin, navy text, resets.
- A page is a stack of `Section`s. Each owns its vertical padding (`--tl-section-space`, 56 → 112px fluid) and wraps content in a `Container` (1200px; `narrow` 760px for articles/forms; `wide` 1360px for hero/gallery).
- Alternate section tones to create rhythm — white → tint → white → navy. Never two different tints back to back, never two navy bands in a row.
- Start sections with `SectionHeader` (eyebrow + title + one-line description, optional action on the far side).

## Spacing scale

4px base: `--tl-space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 20 · `-6` 24 · `-8` 32 · `-10` 40 · `-12` 48 · `-16` 64 · `-20` 80 · `-24` 96 · `-32` 128.

- Inside a component: 8–16. Between related items: 16–24. Between groups: 32–48. Between a section header and its content: 48 (built into `SectionHeader`).
- Use `<Stack gap={n}>` and `<Grid gap={n}>` (the number is the token step) instead of margins.

## Grids

`<Grid columns={3}>` makes up to three equal columns that collapse by themselves as the container narrows — no breakpoints. Typical: services 3–4 columns, articles 3, testimonials 3, team 4, stats 4, documents 1–2.

## Shape

- Radii are generous: cards `--tl-radius-lg` 24px, big panels/forms `--tl-radius-xl` 32px, banners `--tl-radius-2xl` 48px, inputs `--tl-radius-sm` 10px, **buttons and chips are pills**.
- Organic petal masks (`--tl-shape-petal-a|b|c`, `--tl-shape-leaf`) are for photos, icon chips and decor only — not for cards or buttons.

## Elevation

Shadows are soft and navy-tinted: `--tl-shadow-sm` resting cards · `--tl-shadow-md` forms/panels · `--tl-shadow-lg` hover, dialogs, hero photo · `--tl-shadow-primary` the pink glow under primary buttons. Prefer a tinted background over a heavier shadow. No borders *and* shadow on the same card unless it is the hairline `gray-100`.

## Motion

Gentle and short: `--tl-duration-fast` 120ms (colour), `--tl-duration-base` 200ms (lift, arrows), `--tl-duration-slow` 360ms (images, dialogs), easing `--tl-ease-out`. Hover = a 4px lift or a 4px arrow nudge. Nothing loops, nothing bounces, nothing auto-plays. `prefers-reduced-motion` is honoured globally.
