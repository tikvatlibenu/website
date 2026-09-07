'use client'

import { useEffect } from 'react'
import { getDictionary } from '@/i18n/dictionaries'

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  // Client component, so the dictionary is imported statically for the default
  // locale rather than resolved from params.
  const dict = getDictionary('he')

  return (
    <div className="container-prose flex min-h-[55vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl">{dict.common.errorTitle}</h1>
      <p className="mt-3 text-night-700">{dict.common.errorBody}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-candle-500 px-7 py-3 text-base font-semibold text-night-950 transition-colors hover:bg-candle-400"
      >
        {dict.common.retry}
      </button>
    </div>
  )
}
