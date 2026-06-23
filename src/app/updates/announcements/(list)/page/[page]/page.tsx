import Section from '@/components/ui/section'
import Grid from '@/components/ui/grid'
import Pagination from '@/components/ui/pagination'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { BaseContent } from '@/lib/interfaces/content'
import { getAnnouncementsPage } from '@/lib/announcements'
import { CONTENT_LIMITS } from '@/config/content'

export async function generateStaticParams() {
  const articles = await getCollectionMarkdownData<BaseContent>(
    'updates/announcements',
  )
  const { totalPages } = paginateItems(articles, 1, CONTENT_LIMITS.news)
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export const metadata: Metadata = {
  title: 'News & Updates',
  description:
    'Stay up to date with the latest stories, interviews, and updates from the Guiuan Development Foundation Inc.',
}

interface PageProps {
  params: Promise<{ page: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NewsPageRoute({
  params,
  searchParams,
}: PageProps) {
  const [{ page }, resolvedParams] = await Promise.all([params, searchParams])

  const currentPage = Number(page)
  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const { items, totalPages, maxPage, querySuffix } =
    await getAnnouncementsPage(currentPage, resolvedParams)

  if (currentPage > maxPage) notFound()

  return (
    <Section sectionClassName="py-12 md:py-16">
      {items.length > 0 ? (
        <Grid articles={items} />
      ) : (
        <div className="text-center py-12 border border-dashed border-foreground/10 rounded-xl bg-background/50">
          <p className="text-foreground/50 text-sm font-medium">
            No articles match your active filter criteria.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/updates/announcements/page"
          searchParamsSuffix={querySuffix}
        />
      )}
    </Section>
  )
}
