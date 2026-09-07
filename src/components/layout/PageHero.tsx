/** Compact dark banner used at the top of the inner pages. */
export function PageHero({
  title,
  description,
  eyebrow,
}: {
  title: string
  description?: string | null
  eyebrow?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night-900 text-parchment">
      <div
        aria-hidden="true"
        className="absolute -top-20 start-1/3 h-56 w-56 rounded-full bg-candle-500/12 blur-3xl"
      />
      <div className="container-page relative py-16 sm:py-20">
        <div className="max-w-2xl">
          {eyebrow && (
            <span className="text-xs font-semibold tracking-[0.18em] text-candle-400 uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-2 text-4xl sm:text-5xl">{title}</h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-slate-mist-200">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
