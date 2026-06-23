import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { filterAndSortCollection } from '@/lib/content-filter'
import { BaseContent } from './interfaces/content'
import { CONTENT_LIMITS } from '@/config/content'

type AnnouncementsSearchParams = {
  [key: string]: string | string[] | undefined
}

function getParam(params: AnnouncementsSearchParams, key: string) {
  return typeof params[key] === 'string' ? (params[key] as string) : undefined
}

/**
 * Shared by the page-1 route and /page/[page] route so filtering, pagination,
 * and query-string preservation stay in sync between them.
 */
export async function getAnnouncementsPage(
  currentPage: number,
  searchParams: AnnouncementsSearchParams,
) {
  const allArticles = await getCollectionMarkdownData<BaseContent>(
    'updates/announcements',
  )

  const filteredArticles = filterAndSortCollection<BaseContent>(allArticles, {
    q: getParam(searchParams, 'q'),
    category: getParam(searchParams, 'category'),
    sort: getParam(searchParams, 'sort'),
    start_date: getParam(searchParams, 'start_date'),
    end_date: getParam(searchParams, 'end_date'),
  })

  const { items, totalPages } = paginateItems(
    filteredArticles,
    currentPage,
    CONTENT_LIMITS.news,
  )

  // Based on the full, unfiltered collection — lets callers tell "this page
  // segment doesn't exist" (404) apart from "this filter has no matches" (empty state).
  const maxPage = Math.max(
    1,
    Math.ceil(allArticles.length / CONTENT_LIMITS.news),
  )

  const queryBackup = new URLSearchParams()
  for (const key of ['q', 'category', 'sort', 'start_date', 'end_date']) {
    const value = getParam(searchParams, key)
    if (value) queryBackup.set(key, value)
  }
  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return { items, totalPages, maxPage, querySuffix }
}
