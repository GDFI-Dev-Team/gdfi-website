import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { paginateItems } from '@/lib/content/pagination'
import { filterCollection } from '@/lib/content/filter'
import { ArticleContent } from './types'
import { CONTENT_LIMITS } from '@/lib/content/pagination'

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
export async function getAnnouncements(
  currentPage: number,
  searchParams: AnnouncementsSearchParams,
) {
  const allArticles = getCollectionMarkdownData<ArticleContent>(
    'updates/announcements',
  )

  const filteredArticles = filterCollection<ArticleContent>(allArticles, {
    q: getParam(searchParams, 'q'),
    start_date: getParam(searchParams, 'start_date'),
    end_date: getParam(searchParams, 'end_date'),
  })

  const { items, totalPages } = paginateItems(
    filteredArticles,
    currentPage,
    CONTENT_LIMITS.announcements,
  )

  // Based on the full, unfiltered collection — lets callers tell "this page
  // segment doesn't exist" (404) apart from "this filter has no matches" (empty state).
  const maxPage = Math.max(
    1,
    Math.ceil(allArticles.length / CONTENT_LIMITS.announcements),
  )

  const queryBackup = new URLSearchParams()
  for (const key of ['q', 'start_date', 'end_date']) {
    const value = getParam(searchParams, key)
    if (value) queryBackup.set(key, value)
  }
  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return { items, totalPages, maxPage, querySuffix }
}
