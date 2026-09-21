# Typography

One family: **Polin** (Hebrew + Latin, by Hafontia) — shipped as WOFF2 in ten weights, 50–900. Stack: `var(--tl-font-family)`.

| Role | Component | Token | Size | Weight |
|---|---|---|---|---|
| Display (hero) | `<Heading size="display">` | `--tl-font-size-display` | 44 → 72px fluid | 800 |
| H1 | `<Heading level={1}>` | `--tl-font-size-h1` | 36 → 56px | 800 |
| H2 (section titles) | `<Heading level={2}>` | `--tl-font-size-h2` | 28 → 40px | 700 |
| H3 | `<Heading level={3}>` | `--tl-font-size-h3` | 22 → 28px | 700 |
| H4 (card titles) | `<Heading level={4}>` | `--tl-font-size-h4` | 20px | 700 |
| H5 | `<Heading level={5}>` | `--tl-font-size-h5` | 18px | 600 |
| Lead | `<Paragraph size="lead">` | `--tl-font-size-lead` | 20px | 400 |
| Body | `<Paragraph>` | `--tl-font-size-body` | **18px** | 400 |
| Small | `<Paragraph size="sm">` | `--tl-font-size-sm` | 16px | 400 |
| Caption / meta | `<Paragraph size="xs">` | `--tl-font-size-xs` | 14px | 400 |
| Eyebrow | `<Eyebrow>` | — | 14px | 700, +0.04em |
| Big numbers | `<Stat>` | — | 36 → 52px | 900 |

## Hebrew-specific rules

- **Body is 18px with 1.65 line-height.** Hebrew has no ascender/descender rhythm, so it needs more size and leading than Latin to read comfortably. Never go below 14px.
- **No letter-spacing on Hebrew**, except the tiny `--tl-letter-spacing-wide` on eyebrows/badges and `--tl-letter-spacing-tight` on display sizes. There is no uppercase — never rely on caps for hierarchy; use weight and size.
- **No italics** (Polin has none; faux-italic Hebrew is unreadable). Emphasise with weight 600–700 or `<Highlight>`.
- Keep line length near `--tl-measure` (64ch) for articles — `<Paragraph measure>` or `<Container size="narrow">`.
- Headlines use `text-wrap: balance`; avoid one-word last lines by rewriting rather than shrinking.
- Use the maqaf `־` in compounds ("רפואי־חברתי") and the geresh/gershayim `׳ ״` in abbreviations ("מנכ״לית", "דק׳").

## Numbers, prices, Latin

Numbers, phone numbers, e-mails, URLs and prices are **LTR islands** inside RTL text. The components already isolate them (`Stat`, `EventCard`, `TextField type="tel|email"`, `SiteFooter`). In your own markup wrap them: `<span dir="ltr">03-5044900</span>`. The shekel sign goes before the number: `₪180`.

## Emphasis inside headings

`<Highlight>` marks one or two words: `variant="marker"` (yellow highlighter — the default), `"underline"` (a drawn curve), `"color"`. One highlight per heading, at most one highlighted heading per screen.
