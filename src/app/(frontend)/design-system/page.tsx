'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

type Dir = 'rtl' | 'ltr'

const COLORS = [
  { token: '--tl-color-primary', value: '#c92a67', label: 'Primary (donate)' },
  { token: '--tl-color-primary-hover', value: '#ad2158', label: 'Primary hover' },
  { token: '--tl-color-secondary', value: '#16233b', label: 'Secondary' },
  { token: '--tl-color-soft-bg', value: '#fbe9f0', label: 'Soft' },
  { token: '--tl-color-bg-inverse', value: '#0c1424', label: 'Inverse surface' },
  { token: '--color-candle-500', value: '#d9a94e', label: 'Candle accent' },
  { token: '--color-parchment', value: '#fbfaf7', label: 'Parchment' },
]

const LABELS = {
  rtl: {
    donate: 'לתרומה',
    volunteer: 'הצטרפו כמתנדבים',
    readMore: 'קראו עוד',
    allEvents: 'לכל האירועים',
    cancel: 'ביטול',
    sm: 'קטן',
    md: 'בינוני',
    lg: 'גדול',
    donateNow: 'תרמו עכשיו',
    ourStory: 'הסיפור שלנו',
    callUs: 'התקשרו אלינו',
    report: 'הורדת הדוח השנתי',
    sending: 'שולחים…',
    unavailable: 'לא זמין',
    meetUs: 'הכירו את העמותה',
    allActivities: 'לכל הפעילויות',
    secureDonate: 'לתרומה מאובטחת',
  },
  ltr: {
    donate: 'Donate',
    volunteer: 'Join as a volunteer',
    readMore: 'Read more',
    allEvents: 'All events',
    cancel: 'Cancel',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    donateNow: 'Donate now',
    ourStory: 'Our story',
    callUs: 'Call us',
    report: 'Download annual report',
    sending: 'Sending…',
    unavailable: 'Unavailable',
    meetUs: 'Meet the charity',
    allActivities: 'All activities',
    secureDonate: 'Make a secure donation',
  },
} as const

export default function DesignSystemPage() {
  const [dir, setDir] = useState<Dir>('rtl')
  const t = LABELS[dir]

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-night-900/10 pb-8">
        <div>
          <h1 className="text-3xl">Design system</h1>
          <p className="mt-2 text-night-700">
            Tikvatlibenu — live components, rendered from the site&rsquo;s own code.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={dir === 'rtl' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setDir('rtl')}
          >
            עברית · RTL
          </Button>
          <Button
            variant={dir === 'ltr' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setDir('ltr')}
          >
            English · LTR
          </Button>
        </div>
      </header>

      <Section title="Colour tokens">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {COLORS.map((c) => (
            <div key={c.token}>
              <div
                className="h-16 w-full rounded-card border border-night-900/10"
                style={{ background: c.value }}
              />
              <p className="mt-2 text-sm font-medium">{c.label}</p>
              <code className="text-xs text-slate-mist-500">{c.value}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div dir={dir} className="space-y-3">
          <h2 className="text-4xl">{dir === 'rtl' ? 'תקוות ליבנו' : 'Tikvatlibenu'}</h2>
          <h3 className="text-2xl">
            {dir === 'rtl' ? 'כותרת משנה לסעיף' : 'A section subheading'}
          </h3>
          <p className="max-w-prose text-night-800">
            {dir === 'rtl'
              ? 'כל נר הוא סיפור חיים. גוף הטקסט מוגדר ב־Assistant, בגודל בסיס של 16 פיקסל וגובה שורה נדיב לקריאה נוחה.'
              : 'Every candle is a life story. Body copy is set in Assistant at a 16px base with generous line height for comfortable reading.'}
          </p>
        </div>
      </Section>

      <Section title="Button — variants" note="Pink primary is reserved for donating, one per view.">
        <Row dir={dir}>
          <Button variant="primary" iconStart="heart">
            {t.donate}
          </Button>
          <Button variant="secondary">{t.volunteer}</Button>
          <Button variant="outline">{t.readMore}</Button>
          <Button variant="soft">{t.allEvents}</Button>
          <Button variant="ghost">{t.cancel}</Button>
        </Row>
      </Section>

      <Section title="Button — sizes" note="sm 40px · md 48px · lg 56px.">
        <Row dir={dir}>
          <Button size="sm">{t.sm}</Button>
          <Button size="md">{t.md}</Button>
          <Button size="lg">{t.lg}</Button>
        </Row>
      </Section>

      <Section title="Button — with icons" note="Directional icons flip to follow the reading direction.">
        <Row dir={dir}>
          <Button iconStart="heart" size="lg">
            {t.donateNow}
          </Button>
          <Button variant="outline" iconEnd="arrow-forward">
            {t.ourStory}
          </Button>
          <Button variant="secondary" iconStart="phone">
            {t.callUs}
          </Button>
          <Button variant="soft" iconStart="download">
            {t.report}
          </Button>
        </Row>
      </Section>

      <Section title="Button — states">
        <Row dir={dir}>
          <Button loading>{t.sending}</Button>
          <Button disabled>{t.unavailable}</Button>
          <Button variant="outline" disabled>
            {t.unavailable}
          </Button>
        </Row>
      </Section>

      <Section title="Button — on dark">
        <div
          dir={dir}
          className="tl-on-dark flex flex-wrap items-center gap-3"
          style={{
            padding: 'var(--tl-space-8)',
            borderRadius: 'var(--tl-radius-lg)',
            background: 'var(--tl-color-bg-inverse)',
          }}
        >
          <Button variant="primary" iconStart="heart">
            {t.donate}
          </Button>
          <Button variant="inverse">{t.meetUs}</Button>
          <Button variant="inverse-outline" iconEnd="arrow-forward">
            {t.allActivities}
          </Button>
        </div>
      </Section>

      <Section title="Button — full width" note="Mobile CTAs and forms.">
        <div dir={dir} style={{ maxWidth: 360 }}>
          <Button fullWidth size="lg" iconStart="heart">
            {t.secureDonate}
          </Button>
        </div>
      </Section>
    </main>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xs font-bold uppercase tracking-[0.09em] text-slate-mist-500">{title}</h2>
      {note && <p className="mb-4 mt-1 text-sm text-night-700">{note}</p>}
      <div className={note ? '' : 'mt-4'}>{children}</div>
    </section>
  )
}

function Row({ dir, children }: { dir: Dir; children: React.ReactNode }) {
  return (
    <div dir={dir} className="flex flex-wrap items-center gap-3">
      {children}
    </div>
  )
}
