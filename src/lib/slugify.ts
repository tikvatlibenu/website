/**
 * Slug helper that keeps Hebrew characters intact so Hebrew-only titles still
 * produce a usable URL segment.
 */
export function slugify(input: string): string {
  return input
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/["'’״׳]/g, '')
    .replace(/[^a-z0-9\u0590-\u05FF]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
