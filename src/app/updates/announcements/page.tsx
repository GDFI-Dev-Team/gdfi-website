import { Metadata } from 'next'
import { Suspense } from 'react' // fallback UI for loading
import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import NewsFilterBar from '@/features/news/components/filter-bar'
import NewsGrid from '@/features/news/components/grid'
import Pagination from '@/features/news/components/pagination'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { NewsArticle } from '@/lib/interfaces/NewsArticle'
import { filterAndSortCollection } from '@/lib/content-filter'
import { CONTENT_LIMITS } from '@/config/content'

export const metadata: Metadata = {
  title: 'News & Updates',
  description:
    'Stay up to date with the latest stories, interviews, and updates from the Guiuan Development Foundation Inc.',
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Convert function definition to async for safe edge processing
export default async function UpdatesPage({ searchParams }: PageProps) {
  // Concurrently resolve search params and read local files from R2/content disk
  const [resolvedParams, allArticles] = await Promise.all([
    searchParams,
    getCollectionMarkdownData<NewsArticle>('updates/announcements'),
  ])

  // Extract and sanitize current routing calculations
  const rawPage = resolvedParams.page
  const currentPage = rawPage ? Math.max(1, parseInt(String(rawPage), 10)) : 1

  // Process data using our generic filter
  const filteredArticles = filterAndSortCollection<NewsArticle>(allArticles, {
    q: typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined,
    // category filtering disabled until announcements carry a real tag field again
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

  // Calculate pagination slices against the post-filtered dataset
  const { items, totalPages } = paginateItems(
    filteredArticles,
    currentPage,
    CONTENT_LIMITS.news,
  )

  // Generate clean preservation parameters for trailing links
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
            // Passing the base URL ensuring query settings stay appended across clicks
            baseUrl={`/updates/announcements/page`}
            searchParamsSuffix={querySuffix}
          />
        )}
      </Section>
    </main>
  )
}
