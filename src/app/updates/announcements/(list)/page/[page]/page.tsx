import { notFound } from 'next/navigation'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { ArticleContent } from '@/lib/interfaces/content'
import { getAnnouncements } from '@/lib/data/announcements'
import { AnnouncementsGrid } from '@/features/updates/announcements/components/an-grid'
import { CONTENT_LIMITS } from '@/config/content'
import { PageProps } from '@/lib/interfaces/content'

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
