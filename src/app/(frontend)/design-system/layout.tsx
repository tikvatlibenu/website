import type { Metadata } from 'next'
import { Assistant, Frank_Ruhl_Libre } from 'next/font/google'

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-assistant',
})

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-frank-ruhl',
})

/**
 * Internal reference page. It is kept out of search results, out of the
 * sitemap and out of the locale routing, so the URL can be handed to the
 * client as-is.
 */
export const metadata: Metadata = {
  title: 'Design system — Tikvatlibenu',
  robots: { index: false, follow: false, nocache: true },
}

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    // The page chrome (headings, notes, token names) is English; each sample
    // block sets its own direction so both can be shown side by side.
    <html lang="en" dir="ltr" className={`${assistant.variable} ${frankRuhl.variable}`}>
      <body className="bg-parchment text-night-900 antialiased">{children}</body>
    </html>
  )
}
