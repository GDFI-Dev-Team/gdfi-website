import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { paginateItems } from '@/lib/content/pagination'
import { filterCollection } from '@/lib/content/filter'
import { ArticleContent } from './types'

type CollectionSearchParams = {
  [key: string]: string | string[] | undefined
}

const FILTER_KEYS = ['q', 'category'] as const

function getParam(params: CollectionSearchParams, key: string) {
  return typeof params[key] === 'string' ? (params[key] as string) : undefined
}

/**
 * Loads, filters, sorts, and paginates a markdown article collection. Shared by
 * every dated-article listing (announcements, community stories) so filtering,
 * pagination, and query-string preservation stay identical across them.
 */
export async function getArticleCollectionPage(
  subfolder: string,
  perPage: number,
  currentPage: number,
  searchParams: CollectionSearchParams,
) {
  const allArticles = getCollectionMarkdownData<ArticleContent>(subfolder)

  const filteredArticles = filterCollection<ArticleContent>(allArticles, {
    q: getParam(searchParams, 'q'),
    category: getParam(searchParams, 'category'),
  })

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
