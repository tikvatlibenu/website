# Build prompt — tikvatlibenu-website

The intended scope for this project, elaborated from the original idea. Use it as the source of truth for what to build.

---

# Project Build Prompt: Tikvatlibenu (tikvatlibenu.co.il)

## 1. Project Overview & Goals
Tikvatlibenu ("Hope of our Children/Hearts") is a dignified, bilingual (Hebrew & English) memorial and donation platform dedicated to fallen children and adults. The site serves as both a living memorial and an active fundraising portal. The platform must allow visitors to read the stories of the fallen, view media, and make direct donations either to a general fund or to specific, localized campaigns set up for individual fallen souls. 

The primary goal is to provide a seamless, emotionally resonant, and secure user experience that encourages donations while honoring the memory of the deceased with the utmost respect.

### Target Audience
*   **Primary:** Israeli donors, family members, and communities of the fallen (Hebrew-speaking).
*   **Secondary:** International donors, Jewish diaspora, and global supporters (English-speaking).
*   **Administrators:** Non-technical staff at Tikvatlibenu who need to easily spin up new memorial campaigns and manage incoming inquiries.

---

## 2. Key Pages, Sections & Features

### Core Pages (Bilingual: `/he` and `/en`)
1.  **Homepage (`/` or `/he` as default):**
    *   Hero section with a respectful, high-impact background (image or subtle motion), clear mission statement, and primary Call-To-Action (CTA) for the General Donation page.
    *   "Featured Campaigns" section displaying grid cards of individual fallen campaigns (with progress indicators if applicable, or direct links to read/donate).
    *   "About Our Mission" summary.
    *   Latest updates or dynamic memorial wall grid.
2.  **About Page (`/about`):**
    *   The story behind Tikvatlibenu, its mission, and its transparency/trust elements.
3.  **FAQ Page (`/faq`):**
    *   An accordion-style interface addressing donor security, tax-deductibility (e.g., Section 46 in Israel), how funds are distributed, and how families can request a campaign.
4.  **Contact Page (`/contact`):**
    *   A clean, respectful contact form integrated with Resend for notifications. Includes physical office location/details and phone numbers.
5.  **General Donation Page (`/donate`):**
    *   A dedicated page housing an embedded external donation iframe (with fallback loading states).
6.  **Campaign Detail Page (`/campaigns/[slug]`):**
    *   A custom memorial and donation page dedicated to a specific fallen individual.
    *   **Elements:** Full name, birth/death dates, high-resolution photo gallery, embedded YouTube/Vimeo video, a rich-text eulogy/biography, and a dedicated, prominent sidebar/section containing the specific donation iframe for that person.

---

## 3. Design & UX Direction
*   **Tone:** Highly respectful, clean, dignified, hopeful, and trustworthy. Avoid flashy, commercial-style marketing.
*   **Color Palette:** Deep, respectful dark blues, soft slates, off-whites, and warm, hopeful gold or amber accents representing memorial candles and hope.
*   **Typography:** Elegant, highly readable sans-serif or serif typography. Must support both Hebrew (e.g., Assistant, Heebo, or Rubik) and English (e.g., Inter or Lora) seamlessly.
*   **RTL/LTR Support:**
    *   The website is natively bilingual. **Hebrew is the primary language (RTL default)**.
    *   English is the secondary language (LTR).
    *   The layout must flip dynamically based on the active locale, reversing navigation, columns, form alignments, and icons.
*   **Performance & Accessibility:** Fast loading speeds (especially for media-heavy memorial pages) and compliance with accessibility standards (WCAG 2.1 AA) for font sizes, contrast, and screen readers.

---

## 4. Technical Constraints & Architecture

### Tech Stack
*   **Framework:** Next.js (App Router, React Server Components).
*   **Database & Auth:** Supabase (PostgreSQL) as the relational database provider.
*   **CMS & Backend:** **Payload CMS (v3+)** integrated directly as a headless CMS within the Next.js application.
*   **Email Delivery:** Resend.
*   **Styling:** Tailwind CSS (configured with `tailwindcss-rtl` or native logical properties like `ms-auto`, `pe-4`, etc.).
*   **Localization:** Routing and state managed via dynamic locale paths (e.g., `/[locale]/...`) with proper directional attributes (`dir="rtl"` for `he`, `dir="ltr"` for `en`) rendered in the root `<html>` tag.

### Payload CMS Schema & Configuration
Payload must run within the same Next.js project deployment. Define the following schemas:

#### Localization Configuration
```ts
// payload.config.ts
export default buildConfig({
  localization: {
    locales: [
      { label: 'Hebrew', code: 'he', rtl: true },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'he',
    fallback: true,
  },
  // ... collections and globals
})
```

#### Collections
1.  **Users** (Admin access only)
2.  **Campaigns**
    *   `title` (Text, Localized, Required)
    *   `slug` (Text, Unique, Required)
    *   `status` (Select: 'draft', 'published')
    *   `dateOfBirth` (Date)
    *   `dateOfDeath` (Date)
    *   `coverImage` (Media Relationship, Required)
    *   `gallery` (Array of Media Relationships)
    *   `videoUrl` (Text - YouTube/Vimeo link)
    *   `description` (Rich Text, Localized, Required)
    *   `donationIframeCode` (Textarea - Raw HTML embed code for the specific donation form iframe)
3.  **FAQ**
    *   `question` (Text, Localized, Required)
    *   `answer` (Rich Text, Localized, Required)
    *   `order` (Number, for sorting)
4.  **Media**
    *   Upload destination: configured to back up to Supabase Storage (S3-compatible bucket) or local disk with correct access control.

#### Globals
1.  **SiteSettings** (Localized)
    *   `siteName`
    *   `generalDonationIframeCode` (Textarea - Fallback iframe used on the general donation page)
    *   `contactEmail`
    *   `contactPhone`
2.  **Navigation** (Localized)
    *   `headerLinks` (Array of objects: label, url)
    *   `footerLinks` (Array of objects: label, url)

### Data Access
All Next.js server components must fetch content directly from the Payload local API to avoid unnecessary HTTP round-trips:
```ts
import { getPayload } from 'payload'
import config from '@/payload/payload.config'

const payload = await getPayload({ config })
const campaigns = await payload.find({
  collection: 'campaigns',
  locale: locale, // passed from dynamic route param
})
```

---

## 5. SEO, GEO, and I18n Specifications
*   **Routing:** Standardize on localized path prefixes: `/he/campaigns/some-slug` and `/en/campaigns/some-slug`.
*   **HTML Attributes:** Always serve correct `lang` (`he` or `en`) and `dir` (`rtl` or `ltr`) on the outer `<html>` tag dynamically compiled by Next.js layouts.
*   **Metadata:** Use Next.js `generateMetadata` to populate page-specific title, description, and OpenGraph (OG) tags in the active locale's language.
*   **Hreflang Tags:** Dynamically inject `<link rel="alternate" hreflang="..." href="..." />` tags into the document head to inform Google of the bilingual options.
*   **GEO Optimization:** Ensure the default route `/` detects client location headers (if deployed on Vercel/similar cloud providers) to gracefully default overseas users to `/en` and Israeli users to `/he`. (Must remain search-engine crawler friendly).

---

## 6. Project Timeline & Budget Constraints
*   **Total Project Hours:** Exactly **25 hours total**, inclusive of UX/UI Design, CMS architecture setup, frontend integration, localization wiring, payment/iframe integration, and final QA/Deployment.
*   *Note: There are no single-step time limits. Developers must manage this total budget efficiently across all phases.*

---

## 7. Acceptance Criteria

### Technical Requirements
1.  **Bi-directional Layout (RTL/LTR):** Toggle language in the header dynamically swaps the direction of the page layout, navigation bars, and inputs instantly without styling breaks.
2.  **Payload CMS Administration:** The `/admin` path works flawlessly, allowing full localized management of Campaigns, FAQs, and Globals.
3.  **Dynamic Iframes:** The donation forms for both General and Campaign pages successfully render nested third-party donation checkout forms safely (using an insulated rendering block or React `dangerouslySetInnerHTML` for the saved raw HTML code block).
4.  **Supabase Integration:** Media assets successfully upload to Supabase storage buckets, and user state/schemas exist consistently.
5.  **Contact Submissions:** Form submissions on the Contact page trigger clean transactional notification emails to the site administrator using Resend.
6.  **SEO Compliance:** Valid hreflang tags, dynamic XML sitemaps containing both language paths, and dynamic meta descriptions present across all campaign paths.
7.  **Responsive Execution:** Perfectly responsive layout from mobile (360px width) up to ultra-wide displays (1920px+).
