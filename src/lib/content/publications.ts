import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { paginateItems, CONTENT_LIMITS } from '@/lib/content/pagination'
import { Publication } from './types'

type PublicationsSearchParams = {
  [key: string]: string | string[] | undefined
}

function getParam(params: PublicationsSearchParams, key: string) {
  return typeof params[key] === 'string' ? (params[key] as string) : undefined
}

/**
 * Shared by the page-1 route and /page/[page] route so filtering, pagination,
 * and query-string preservation stay in sync between them.
 */
export function getPublications(
  currentPage: number,
  searchParams: PublicationsSearchParams,
) {
  const allPublications = getCollectionMarkdownData<Omit<Publication, 'slug'>>(
    'resources/research-and-publications',
  ).sort((a, b) => Number(b.year) - Number(a.year))

  const q = (getParam(searchParams, 'q') || '').trim().toLowerCase()
  const startYear = getParam(searchParams, 'start_year')
  const endYear = getParam(searchParams, 'end_year')
  const start = startYear ? Number(startYear) : null
  const end = endYear ? Number(endYear) : null

  const filtered = allPublications.filter((p) => {
    const year = Number(p.year)
    if (start !== null && year < start) return false
    if (end !== null && year > end) return false
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      p.authors.toLowerCase().includes(q) ||
      (p.outlet?.toLowerCase().includes(q) ?? false)
    )
  })

  const { items, totalPages } = paginateItems(
    filtered,
    currentPage,
    CONTENT_LIMITS.publications,
  )

  // Based on the full, unfiltered collection — lets callers tell "this page
  // segment doesn't exist" (404) apart from "this filter has no matches" (empty state).
  const maxPage = Math.max(
    1,
    Math.ceil(allPublications.length / CONTENT_LIMITS.publications),
  )

  const queryBackup = new URLSearchParams()
  for (const key of ['q', 'start_year', 'end_year']) {
    const value = getParam(searchParams, key)
    if (value) queryBackup.set(key, value)
  }
  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return { items, totalPages, maxPage, querySuffix }
}
