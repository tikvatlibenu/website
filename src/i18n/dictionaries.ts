// Plain JSON lookups: safe in both server and client components.
import type { Locale } from './config'
import he from './dictionaries/he.json'
import en from './dictionaries/en.json'

export type Dictionary = typeof he

const dictionaries: Record<Locale, Dictionary> = {
  he,
  en: en as Dictionary,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.he
}
