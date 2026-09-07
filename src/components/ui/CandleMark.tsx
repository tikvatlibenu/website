/** Memorial candle flame used as the site mark. */
export function CandleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 3.5c3.4 3.9 5.4 6.9 5.4 9.7 0 3.2-2.4 5.4-5.4 5.4s-5.4-2.2-5.4-5.4c0-2.8 2-5.8 5.4-9.7Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M16 8.6c1.7 2 2.6 3.5 2.6 4.8 0 1.6-1.2 2.7-2.6 2.7s-2.6-1.1-2.6-2.7c0-1.3.9-2.8 2.6-4.8Z"
        fill="#fbfaf7"
        opacity="0.55"
      />
      <rect x="12.4" y="19.4" width="7.2" height="9.1" rx="1.4" fill="currentColor" opacity="0.35" />
    </svg>
  )
}
