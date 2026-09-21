# Tikvatlibenu — memorial & donation platform

Bilingual (Hebrew RTL / English LTR) memorial and fundraising site for
Tikvatlibenu, built as a single Next.js application with Payload CMS embedded.

- **Framework:** Next.js 16 (App Router, React Server Components)
- **CMS:** Payload 3 at `/admin`, served from the same deployment
- **Database:** PostgreSQL (Supabase)
- **Media:** Supabase Storage over the S3 API, local disk as a fallback
- **Email:** Resend
- **Styling:** Tailwind CSS 4 with logical properties throughout

---

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values, see below
pnpm migrate                 # create the schema
pnpm seed                    # optional: sample bilingual content + admin user
pnpm dev
```

- Site: http://localhost:3000 (redirects to `/he` or `/en`)
- Admin: http://localhost:3000/admin

The seed creates `admin@tikvatlibenu.co.il` / `ChangeMe123!`. **Change this
password immediately** — override with `SEED_ADMIN_EMAIL` and
`SEED_ADMIN_PASSWORD` before seeding, or edit the user in the admin UI.

### A throwaway local database

If you would rather not point local development at Supabase:

```bash
docker run -d --name tikvat-pg \
  -e POSTGRES_PASSWORD=tikvat -e POSTGRES_DB=tikvatlibenu \
  -p 55432:5432 postgres:16-alpine
# DATABASE_URI=postgresql://postgres:tikvat@127.0.0.1:55432/tikvatlibenu
```

---

## Environment variables

Every variable is documented in [.env.example](.env.example). The essentials:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SERVER_URL` | yes | Public origin. Drives canonical URLs, hreflang and the sitemap. |
| `PAYLOAD_SECRET` | yes | Random string. `openssl rand -base64 32` |
| `DATABASE_URI` | yes | Supabase **transaction** pooler, port 6543. Used by the app and the build. |
| `DATABASE_URI_SESSION` | yes | Supabase **session** pooler, port 5432. Used only by migrations. |
| `DATABASE_POOL_MAX` | no | Connections per instance, default 4. |
| `NEXT_PUBLIC_SUPABASE_URL` | no | Project URL, from Project Settings > Data API. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | no | `sb_publishable_...`. Safe in the browser; row level security governs what it reaches. |
| `SUPABASE_SECRET_KEY` | no | `sb_secret_...`. Bypasses row level security — server-side only, never prefixed with `NEXT_PUBLIC_`. |
| `S3_*` | no | Supabase Storage credentials. Leave blank and uploads go to local disk under `/media`. |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | no | Without them the contact form still stores submissions, it just cannot email them. |
| `CONTACT_NOTIFICATION_EMAIL` | no | Overrides the address in Site Settings → Contact. |

---

## Content model

Editors work entirely in `/admin`. Every text field marked below is per-language
— switch locale with the picker in the admin header.

**Collections**

| Collection | Purpose |
| --- | --- |
| `campaigns` | One memorial page per person: name, dates, cover image, gallery, video URL, eulogy, and that person's own donation iframe. Only `published` campaigns are publicly readable. |
| `faqs` | Accordion entries on `/faq`, ordered by the `order` field. |
| `media` | Uploads. `alt` is required and localized. |
| `contact-submissions` | Archive of contact form submissions, with a flag showing whether the notification email went out. |
| `users` | Admin logins. |

**Globals**

| Global | Purpose |
| --- | --- |
| `site-settings` | Site name, tagline, contact details, social links, and the **general donation iframe** used on `/donate` and as the fallback for campaigns without their own. |
| `navigation` | Header and footer link lists (each list is per-language), the header donate button, and the footer small print. |
| `about-page` | The `/about` story, hero image and the trust/transparency cards. |

### Donation iframes

Paste the provider's raw embed snippet into `donationIframeCode` (per campaign)
or `generalDonationIframeCode` (Site Settings). When the snippet is a plain
`<iframe>`, the site extracts its `src` and renders its own iframe so it can show
a loading state and control sizing; anything more complex is rendered as-is.
A campaign with no snippet of its own falls back to the general fund form.

Only `https://` sources are accepted for the extracted-iframe path.

---

## Localization

- Locales: `he` (default, RTL) and `en` (LTR), configured in both
  `src/payload.config.ts` and `src/i18n/config.ts`.
- Routes are locale-prefixed: `/he/campaigns/some-slug`, `/en/campaigns/some-slug`.
- `src/proxy.ts` redirects unprefixed paths. Israeli visitors (via
  `x-vercel-ip-country` / `cf-ipcountry`) get `/he`, others get `/en`, and a
  visitor's explicit choice is remembered in the `NEXT_LOCALE` cookie.
  **Crawlers always get the default locale** so indexed URLs stay deterministic.
- `<html lang>` and `<html dir>` are set per locale in the locale layout.
- UI chrome strings live in `src/i18n/dictionaries/*.json`; everything else
  comes from the CMS.

Layout is direction-agnostic: use logical utilities (`ms-`, `pe-`, `text-start`,
`border-inline-start`) rather than `ml-`/`pr-`/`text-left`, and flip directional
icons with `rtl:-scale-x-100`.

---

## SEO

- `generateMetadata` on every route, in the active language.
- `hreflang` alternates (`he-IL`, `en`, `x-default`) on every page.
- `/sitemap.xml` lists both languages for all static pages and every published
  campaign, each entry carrying its alternates.
- `/robots.txt` disallows `/admin` and `/api/`.
- Structured data: `FAQPage` on `/faq`, `Person` on each memorial page.

---

## Deploying

1. Provision Supabase (database + a storage bucket) and set the environment
   variables on the host.
2. Run migrations before the app starts. Do this as a separate step, not inside
   the Vercel build — the build itself must not open a session-pooler
   connection:

   ```bash
   pnpm migrate
   ```

3. Migrations live in `src/migrations/`. After changing any collection or global,
   generate one and commit it:

   ```bash
   pnpm migrate:create <name>
   ```

### Row level security

Supabase exposes every table in `public` over its REST Data API, reachable with
the publishable key — which is public by design. This app never uses that API:
everything goes through Payload, connected as the table owner, which RLS does
not apply to.

So every table has **RLS enabled with no policies**: the Data API sees nothing
and can change nothing, while Payload is unaffected. This is migration
`20260921_120000_enable_rls`, which also installs an event trigger that enables
RLS on any table created later.

- Never use `FORCE ROW LEVEL SECURITY` — it applies RLS to the owner too and
  locks Payload out.
- If a feature ever needs the Data API, add a narrow policy for that one table in
  its own migration. Do not disable RLS.

### Connection pooling

Supabase's **session** pooler allows 15 client connections for the entire
project, shared by every environment at once. `node-postgres` defaults to 10 per
pool and holds them idle, so a single running dev server plus a production build
exhausts the budget and the build dies mid-prerender:

```
(EMAXCONNSESSION) max clients reached in session mode - max clients are limited to pool_size: 15
```

The app and the build therefore use the **transaction** pooler (port 6543),
which multiplexes and has no such ceiling. Only migrations use the session
pooler, via `pnpm migrate`, which swaps in `DATABASE_URI_SESSION`.

`DATABASE_POOL_MAX` (default 4) caps what each instance holds, which matters on
serverless where every function instance opens its own pool.

`pnpm generate:types` regenerates `src/payload-types.ts` after schema changes;
the build type-checks against it.

---

## Accessibility notes

Keep these intact when editing:

- Skip link to `#main` as the first focusable element.
- Visible focus ring (`:focus-visible`, candle gold) on every interactive element.
- The accordion, mobile menu and gallery are keyboard operable and announce
  state via `aria-expanded` / `aria-controls`; the gallery lightbox closes on
  Escape and moves with arrow keys.
- Videos are click-to-play, so no third-party player loads until asked for.
- `prefers-reduced-motion` disables transitions and smooth scrolling.
