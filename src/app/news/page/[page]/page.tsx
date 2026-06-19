import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import NewsFilterBar from '@/features/news/components/filter-bar'
import NewsGrid from '@/features/news/components/grid'
import Pagination from '@/features/news/components/pagination'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { NewsArticle } from '@/lib/interfaces/NewsArticle'

const ITEMS_PER_PAGE = 6

export async function generateStaticParams() {
  const articles = getCollectionMarkdownData<NewsArticle>('news/')
  const { totalPages } = paginateItems(articles, 1, ITEMS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export const metadata: Metadata = {
  title: 'News & Updates',
  description:
    'Stay up to date with the latest stories, interviews, and updates from the Guiuan Development Foundation Inc.',
}

export default async function NewsPageRoute({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  const currentPage = Number(page)

  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const allArticles = getCollectionMarkdownData<NewsArticle>('news/')
  const { items, totalPages } = paginateItems(
    allArticles,
    currentPage,
    ITEMS_PER_PAGE,
  )

  if (currentPage > totalPages) notFound()

  return (
    <main className="flex-1 flex flex-col bg-foreground/[0.02]">
      <Banner
        title="News"
        description="Stay up to date with the latest stories, interviews, and updates from GDFI."
        imgUrl="/feat-hero/hero-1.webp"
      />

      <NewsFilterBar />

      <Section sectionClassName="py-12 md:py-16">
        <NewsGrid articles={items} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/news/page"
        />
      </Section>
    </main>
  )
}
