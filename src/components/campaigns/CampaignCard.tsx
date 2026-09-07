import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/i18n/config'
import type { Campaign } from '@/payload-types'
import { localePath } from '@/lib/url'
import { mediaAlt, mediaUrl } from '@/lib/media'
import { formatLifespan } from '@/lib/format'

export function CampaignCard({
  campaign,
  locale,
  readMoreLabel,
}: {
  campaign: Campaign
  locale: Locale
  readMoreLabel: string
}) {
  const href = localePath(locale, `/campaigns/${campaign.slug}`)
  const cover = mediaUrl(campaign.coverImage, 'card')
  const lifespan = formatLifespan(campaign.dateOfBirth, campaign.dateOfDeath)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-night-900/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-mist-200">
        {cover ? (
          <Image
            src={cover}
            alt={mediaAlt(campaign.coverImage, campaign.title)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-night-700 to-night-950" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-950/70 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl leading-snug">
          <Link href={href} className="after:absolute after:inset-0 focus:outline-none">
            {campaign.title}
          </Link>
        </h3>

        {lifespan && (
          <p dir="ltr" className="mt-1 text-sm font-medium text-candle-700 rtl:text-end">
            {lifespan}
          </p>
        )}

        {campaign.excerpt && (
          <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-night-700/90">
            {campaign.excerpt}
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-night-800 group-hover:text-candle-700">
          {readMoreLabel}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="rtl:-scale-x-100"
          >
            <path d="M5 12h13M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </article>
  )
}
