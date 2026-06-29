import { notFound } from 'next/navigation'
import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { paginateItems } from '@/lib/content/pagination'
import { ArticleContent } from '@/lib/content/types'
import { getAnnouncements } from '@/lib/content/announcements'
import { AnnouncementsGrid } from '@/features/updates/announcements/components/an-grid'
import { CONTENT_LIMITS } from '@/lib/content/pagination'
import { PageProps } from '@/lib/content/types'

export async function generateStaticParams() {
  const articles = await getCollectionMarkdownData<ArticleContent>(
    'updates/announcements',
  )
  const { totalPages } = paginateItems(
    articles,
    1,
    CONTENT_LIMITS.announcements,
  )
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export default async function AnnouncementsPageRoute({
  params,
  searchParams,
}: PageProps) {
  const [{ page }, resolvedParams] = await Promise.all([params, searchParams])

  const currentPage = Number(page)
  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const { items, totalPages, maxPage, querySuffix } = await getAnnouncements(
    currentPage,
    resolvedParams,
  )

  if (currentPage > maxPage) notFound()

  return (
    <AnnouncementsGrid
      items={items}
      totalPages={totalPages}
      currentPage={currentPage}
      querySuffix={querySuffix}
    />
  )
}
