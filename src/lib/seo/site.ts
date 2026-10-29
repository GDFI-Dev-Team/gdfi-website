/**
 * Absolute origin of the site, used for metadataBase, the sitemap, robots and
 * share links. NEXT_PUBLIC_* vars are inlined at BUILD time, so production
 * builds must receive NEXT_PUBLIC_APP_URL as a build variable — a runtime
 * Worker variable is too late. Production falls back to the live domain so a
 * missing variable never leaks localhost into canonicals or the sitemap.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://gdfi1988.org'
    : 'http://localhost:3000')
).replace(/\/$/, '')

export const SITE_NAME = 'Guiuan Development Foundation Inc.'
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`

/** Resolves a root-relative path (e.g. `/get-involved`) to an absolute URL. */
export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`
}
