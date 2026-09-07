export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: string
  description?: string | null
  align?: 'start' | 'center'
  as?: 'h1' | 'h2'
}) {
  const alignment =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-start items-start'

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.18em] text-candle-700 uppercase">
          {eyebrow}
        </span>
      )}
      <Tag className={Tag === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}>{title}</Tag>
      {description && (
        <p className="text-lg leading-relaxed text-night-700/90">{description}</p>
      )}
    </div>
  )
}
