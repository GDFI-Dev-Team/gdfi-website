import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Metadata } from 'next'
import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import NewsFilterBar from '@/components/ui/filter-bar'
import NewsGrid from '@/components/ui/grid'
import Pagination from '@/components/ui/pagination'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { NewsArticle } from '@/lib/interfaces/news-article'
import { filterAndSortCollection } from '@/lib/content-filter'
import { CONTENT_LIMITS } from '@/config/content'

export async function generateStaticParams() {
  const articles = await getCollectionMarkdownData<NewsArticle>('news')
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
  const [{ page }, resolvedParams, allArticles] = await Promise.all([
    params,
    searchParams,
    getCollectionMarkdownData<NewsArticle>('news'),
  ])

  const currentPage = Number(page)
  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const filteredArticles = filterAndSortCollection<NewsArticle>(allArticles, {
    q: typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined,
    category:
      typeof resolvedParams.category === 'string'
        ? resolvedParams.category
        : undefined,
    sort:
      typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined,
    start_date:
      typeof resolvedParams.start_date === 'string'
        ? resolvedParams.start_date
        : undefined,
    end_date:
      typeof resolvedParams.end_date === 'string'
        ? resolvedParams.end_date
        : undefined,
  })

  const { items, totalPages } = paginateItems(
    filteredArticles,
    currentPage,
    CONTENT_LIMITS.news,
  )

  if (currentPage > totalPages) notFound()

  const queryBackup = new URLSearchParams()
  if (resolvedParams.q) queryBackup.set('q', String(resolvedParams.q))
  if (resolvedParams.category)
    queryBackup.set('category', String(resolvedParams.category))
  if (resolvedParams.sort) queryBackup.set('sort', String(resolvedParams.sort))
  if (resolvedParams.start_date)
    queryBackup.set('start_date', String(resolvedParams.start_date))
  if (resolvedParams.end_date)
    queryBackup.set('end_date', String(resolvedParams.end_date))

  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">
      <Banner
        title="News"
        description="Stay up to date with the latest stories, interviews, and updates from GDFI."
        imgUrl="/feat-hero/hero-1.webp"
      />

      <Suspense
        fallback={<div className="h-16 bg-foreground/3 animate-pulse" />}
      >
        <NewsFilterBar />
      </Suspense>

      <Section sectionClassName="py-12 md:py-16">
        {items.length > 0 ? (
          <NewsGrid articles={items} />
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
    </main>
  )
}
