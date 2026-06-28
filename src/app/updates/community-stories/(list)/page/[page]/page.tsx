import { notFound } from 'next/navigation'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { ArticleContent } from '@/lib/interfaces/content'
import { getCommunityStories } from '@/lib/data/community-stories'
import { CommunityStoriesGrid } from '@/features/updates/community-stories/components/cs-grid'
import { CONTENT_LIMITS } from '@/config/content'
import { PageProps } from '@/lib/interfaces/content'

export async function generateStaticParams() {
  const articles = await getCollectionMarkdownData<ArticleContent>(
    'updates/community-stories',
  )
  const { totalPages } = paginateItems(
    articles,
    1,
    CONTENT_LIMITS.communityStories,
  )
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export default async function CommunityStoriesPageRoute({
  params,
  searchParams,
}: PageProps) {
  const [{ page }, resolvedParams] = await Promise.all([params, searchParams])

  const currentPage = Number(page)
  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const { items, totalPages, maxPage, querySuffix } = await getCommunityStories(
    currentPage,
    resolvedParams,
  )

  if (currentPage > maxPage) notFound()

  return (
    <CommunityStoriesGrid
      items={items}
      totalPages={totalPages}
      currentPage={currentPage}
      querySuffix={querySuffix}
    />
  )
}
