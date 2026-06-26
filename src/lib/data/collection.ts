import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { filterAndSortCollection } from '@/lib/content-filter'
import { ArticleContent } from '../interfaces/content'

type CollectionSearchParams = {
  [key: string]: string | string[] | undefined
}

const FILTER_KEYS = ['q', 'category', 'sort', 'start_date', 'end_date'] as const

function getParam(params: CollectionSearchParams, key: string) {
  return typeof params[key] === 'string' ? (params[key] as string) : undefined
}

/**
 * Loads, filters, sorts, and paginates a markdown article collection. Shared by
 * every dated-article listing (announcements, community stories, …) so filtering,
 * pagination, and query-string preservation stay identical across them.
 */
export async function getArticleCollectionPage(
  subfolder: string,
  perPage: number,
  currentPage: number,
  searchParams: CollectionSearchParams,
) {
  const allArticles = getCollectionMarkdownData<ArticleContent>(subfolder)

  const filteredArticles = filterAndSortCollection<ArticleContent>(
    allArticles,
    {
      q: getParam(searchParams, 'q'),
      category: getParam(searchParams, 'category'),
      sort: getParam(searchParams, 'sort'),
      start_date: getParam(searchParams, 'start_date'),
      end_date: getParam(searchParams, 'end_date'),
    },
  )

  const { items, totalPages } = paginateItems(
    filteredArticles,
    currentPage,
    perPage,
  )

  // Based on the full, unfiltered collection — lets callers tell "this page
  // segment doesn't exist" (404) apart from "this filter has no matches" (empty state).
  const maxPage = Math.max(1, Math.ceil(allArticles.length / perPage))

  const queryBackup = new URLSearchParams()
  for (const key of FILTER_KEYS) {
    const value = getParam(searchParams, key)
    if (value) queryBackup.set(key, value)
  }
  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return { items, totalPages, maxPage, querySuffix }
}
