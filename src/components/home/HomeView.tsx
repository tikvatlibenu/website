'use client'

import {
  TikvatRoot,
  SiteHeader,
  SiteFooter,
  FloatingContact,
  Hero,
  Highlight,
  Section,
  SectionHeader,
  Grid,
  ServiceCard,
  StatGroup,
  Stat,
  Eyebrow,
  Heading,
  Paragraph,
  TextLink,
  Picture,
  Card,
  CTABanner,
} from '@/ds'
import type { HomePage } from '@/payload-types'
import { ButterflyFlight } from './ButterflyFlight'
import '@/ds/styles.css'

type LinkItem = { label: string; href: string }

export type HomeCampaign = {
  title: string
  href: string
  years?: string
  excerpt?: string
  imageUrl?: string
  linkLabel: string
}

export type HomeViewProps = {
  locale: string
  dir: 'rtl' | 'ltr'
  home: HomePage
  heroImageUrl?: string
  aboutImageUrl?: string
  campaigns: HomeCampaign[]
  header: { links: LinkItem[]; donateHref: string; donateLabel?: string; phone?: string }
  footer: {
    description?: string
    columnTitle: string
    links: LinkItem[]
    phone?: string
    email?: string
    address?: string
    social: { platform: 'facebook' | 'instagram' | 'youtube' | 'whatsapp'; href: string }[]
    donateHref: string
    donateLabel?: string
    registrationNumber?: string
    copyright?: string
  }
  hrefs: { donate: string; about: string; contact: string; campaigns: string }
  whatsapp?: string
}

/** id ролика из любого вида ссылки YouTube (watch, shorts, youtu.be). */
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/)
  return m ? m[1] : null
}

const STORY_TINTS = ['#f41d5a', '#41c4af', '#ffc63a', '#fe9a0c']

function VideoStoryCard({
  videoUrl,
  title,
  description,
  coverUrl,
  tint,
  linkLabel,
}: {
  videoUrl: string
  title: string
  description?: string
  coverUrl?: string
  tint: string
  linkLabel: string
}) {
  const id = youtubeId(videoUrl)
  const thumb = coverUrl ?? (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined)
  return (
    <Card variant="elevated" padding="md">
      <a
        href={videoUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={title}
        style={{
          display: 'block',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          background: `linear-gradient(135deg, ${tint}22, #1e1f6322)`,
        }}
      >
        {thumb && (
          // Превью с YouTube; при недоступности остаётся брендовый градиент.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <span
            style={{
              inlineSize: '56px',
              blockSize: '56px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,.92)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 8px 24px rgba(30,31,99,.28)',
            }}
          >
            <svg width={20} height={20} viewBox="0 0 20 20" style={{ marginInlineStart: '3px' }}>
              <path d="M5 3.5v13l11-6.5z" fill="#1e1f63" />
            </svg>
          </span>
        </span>
      </a>
      <div style={{ blockSize: '14px' }} />
      <Heading level={3} size="h5">
        {title}
      </Heading>
      {description && (
        <Paragraph size="sm" tone="secondary">
          {description}
        </Paragraph>
      )}
      <div style={{ blockSize: '8px' }} />
      <TextLink href={videoUrl} variant="standalone" tone="primary" arrow>
        {linkLabel}
      </TextLink>
    </Card>
  )
}

export function HomeView({
  locale,
  dir,
  home,
  heroImageUrl,
  aboutImageUrl,
  campaigns,
  header,
  footer,
  hrefs,
  whatsapp,
}: HomeViewProps) {
  const storyLinkLabel = locale === 'he' ? 'לצפייה בסרטון' : 'Watch the video'

  return (
    <TikvatRoot dir={dir} lang={locale}>
      <SiteHeader
        links={header.links}
        logoHref={`/${locale}`}
        donateHref={header.donateHref}
        donateLabel={header.donateLabel}
        phone={header.phone}
        sticky
      />

      <main>
        <Hero
          variant="split"
          decor
          eyebrow={home.heroEyebrow ?? undefined}
          title={
            <>
              {home.heroTitle}{' '}
              {home.heroTitleHighlight && <Highlight variant="marker">{home.heroTitleHighlight}</Highlight>}
            </>
          }
          description={home.heroDescription ?? undefined}
          imageSrc={heroImageUrl}
          imageAlt={home.heroEyebrow ?? ''}
          primaryAction={
            home.heroPrimaryLabel ? { label: home.heroPrimaryLabel, href: hrefs.donate, icon: 'heart' } : undefined
          }
          secondaryAction={
            home.heroSecondaryLabel ? { label: home.heroSecondaryLabel, href: hrefs.about } : undefined
          }
          highlights={(home.heroHighlights ?? []).map((it) => ({ value: it.value, label: it.label }))}
        />

        {/* Услуги; на край последней буквы заголовка садится бабочка. */}
        <Section id="services" tone="white">
          <SectionHeader
            eyebrow={home.servicesEyebrow ?? undefined}
            title={
              <span style={{ position: 'relative', display: 'inline-block' }}>
                {home.servicesTitle}
                <span
                  className="tl-home-perch"
                  data-perch
                  style={{ insetInlineEnd: '3px', insetBlockStart: '10px' }}
                />
              </span>
            }
            description={home.servicesDescription ?? undefined}
          />
          <div style={{ blockSize: '24px' }} />
          <Grid columns={4} gap={6}>
            {(home.services ?? []).map((s, i) => (
              <ServiceCard
                key={s.id ?? i}
                // components.d.ts не включает 'yellow', но класс tl-service-card--yellow есть в CSS системы
                tone={s.tone as 'teal'}
                icon={s.icon}
                headingLevel={3}
                title={s.title}
                description={s.description ?? ''}
              />
            ))}
          </Grid>
        </Section>

        {/* Прозрачность: только факты из публичного реестра. */}
        <Section tone="navy">
          <SectionHeader
            eyebrow={home.transparencyEyebrow ?? undefined}
            eyebrowTone="inverse"
            title={home.transparencyTitle}
            description={home.transparencyDescription ?? undefined}
          />
          <div style={{ blockSize: '24px' }} />
          <StatGroup variant="plain" columns={3} dividers>
            {(home.transparencyItems ?? []).map((it, i) => (
              <Stat key={it.id ?? i} tone="inverse" value={it.value} label={it.label} />
            ))}
          </StatGroup>
        </Section>

        <Section id="about" tone="sky" decor>
          <Grid columns={2} gap={12} align="center">
            <div>
              {home.aboutEyebrow && <Eyebrow tone="teal">{home.aboutEyebrow}</Eyebrow>}
              <Heading level={2}>{home.aboutTitle}</Heading>
              <Paragraph>{home.aboutBody}</Paragraph>
              <div style={{ blockSize: '16px' }} />
              {home.aboutLinkLabel && (
                <TextLink href={hrefs.about} variant="standalone" tone="primary" arrow>
                  {home.aboutLinkLabel}
                </TextLink>
              )}
            </div>
            <Picture
              src={aboutImageUrl}
              alt={home.aboutTitle ?? ''}
              shape="petal"
              ratio="4/5"
              tone="sky"
            />
          </Grid>
        </Section>

        <Section id="stories" tone="white">
          <SectionHeader
            align="center"
            eyebrow={home.storiesEyebrow ?? undefined}
            title={home.storiesTitle}
            description={home.storiesDescription ?? undefined}
          />
          <div style={{ blockSize: '24px' }} />
          <Grid columns={3} gap={6}>
            {(home.stories ?? []).map((story, i) => (
              <VideoStoryCard
                key={story.id ?? i}
                videoUrl={story.videoUrl}
                title={story.title}
                description={story.description ?? undefined}
                coverUrl={
                  typeof story.cover === 'object' && story.cover?.url ? story.cover.url : undefined
                }
                tint={STORY_TINTS[i % STORY_TINTS.length]}
                linkLabel={storyLinkLabel}
              />
            ))}
          </Grid>
        </Section>

        {campaigns.length > 0 && (
          <Section id="campaigns" tone="soft">
            <SectionHeader
              eyebrow={home.campaignsEyebrow ?? undefined}
              title={home.campaignsTitle}
              description={home.campaignsDescription ?? undefined}
            />
            <div style={{ blockSize: '24px' }} />
            <Grid columns={campaigns.length > 1 ? 3 : 1} gap={6}>
              {campaigns.map((c) => (
                <Card key={c.href} variant="elevated" padding="md">
                  <Picture src={c.imageUrl} alt={c.title} shape="soft" ratio="3/2" tone="sun" />
                  <div style={{ blockSize: '14px' }} />
                  <Heading level={3} size="h5">
                    {c.title}
                  </Heading>
                  {c.years && (
                    <Paragraph size="xs" tone="muted">
                      <span dir="ltr">{c.years}</span>
                    </Paragraph>
                  )}
                  {c.excerpt && (
                    <Paragraph size="sm" tone="secondary">
                      {c.excerpt}
                    </Paragraph>
                  )}
                  <div style={{ blockSize: '8px' }} />
                  <TextLink href={c.href} variant="standalone" tone="primary" arrow>
                    {c.linkLabel}
                  </TextLink>
                </Card>
              ))}
            </Grid>
          </Section>
        )}

        <Section id="donate" tone="white" spacing="compact">
          <CTABanner
            tone="navy"
            layout="inline"
            decor
            headingLevel={2}
            title={home.ctaTitle}
            description={home.ctaDescription ?? undefined}
            primaryAction={{ label: home.ctaPrimaryLabel ?? '', href: hrefs.donate, icon: 'heart' }}
            secondaryAction={
              home.ctaSecondaryLabel ? { label: home.ctaSecondaryLabel, href: hrefs.contact } : undefined
            }
          />
        </Section>
      </main>

      <div id="contact">
        <SiteFooter
          description={footer.description}
          donateHref={footer.donateHref}
          donateLabel={footer.donateLabel}
          columns={[{ title: footer.columnTitle, links: footer.links }]}
          phone={footer.phone}
          email={footer.email}
          address={footer.address}
          social={footer.social}
          registrationNumber={footer.registrationNumber}
          copyright={footer.copyright}
        />
      </div>

      <FloatingContact whatsapp={whatsapp} phone={footer.phone} side="end" />
      <ButterflyFlight />
    </TikvatRoot>
  )
}
