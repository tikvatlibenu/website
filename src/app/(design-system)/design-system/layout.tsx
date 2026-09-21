import type { Metadata } from 'next'

// The design system's own stylesheet: tokens, Polin @font-face rules and every
// component's CSS. Deliberately outside the (frontend) group, whose globals.css
// defines its own --tl-* values that would otherwise win.
import '@/ds/styles.css'

/**
 * Internal reference page. Kept out of search results, out of the sitemap and
 * out of the locale routing, so the URL can be handed to the client as-is.
 */
export const metadata: Metadata = {
  title: 'מערכת העיצוב — תקוות ליבנו',
  robots: { index: false, follow: false, nocache: true },
}

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  // TikvatRoot sets direction on its own wrapper; the document needs it too so
  // scrollbars, focus order and the page background follow the same axis.
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
