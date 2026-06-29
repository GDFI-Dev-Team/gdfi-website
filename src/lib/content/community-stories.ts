import { CONTENT_LIMITS } from '@/lib/content/pagination'
import { getArticleCollectionPage } from './collection'

type CommunityStoriesSearchParams = {
  [key: string]: string | string[] | undefined
}

/**
 * Shared by the page-1 route and /page/[page] route so filtering, pagination,
 * and query-string preservation stay in sync between them.
 */
export async function getCommunityStories(
  currentPage: number,
  searchParams: CommunityStoriesSearchParams,
) {
  return getArticleCollectionPage(
    'updates/community-stories',
    CONTENT_LIMITS.communityStories,
    currentPage,
    searchParams,
  )
}
