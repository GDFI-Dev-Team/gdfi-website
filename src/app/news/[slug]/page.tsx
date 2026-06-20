import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
} from '@/lib/markdown'
import { NewsArticle } from '@/lib/interfaces/NewsArticle'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import ArticleImages from '@/features/news/components/article-images'
import { formatEdgeDate } from '@/lib/date'

export function generateStaticParams() {
  const articles = getCollectionMarkdownData<NewsArticle>('news')
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params

  let article: NewsArticle
  try {
    article = getSingleMarkdownData<NewsArticle>('news', `${slug}.md`)
  } catch {
    notFound()
  }

  return (
    <main className="flex-1 flex flex-col bg-background pt-24 md:pt-32">
      <Section maxWidth="4xl" sectionClassName="py-8 md:py-12">
        <div className="mb-8">
          <Link href="/news" className="inline-flex">
            <Button
              variant="ghost"
              className="gap-2 px-0 hover:bg-transparent hover:text-btn-primary"
            >
              <ChevronLeft size={18} aria-hidden="true" />
              Back to News
            </Button>
          </Link>
        </div>

        <header className="flex flex-col gap-4 mb-8">
          <Heading level={1} className="text-balance leading-tight">
            {article.title}
          </Heading>

          <div className="flex items-center gap-3 text-foreground/60 mt-2">
            <span className="font-bold text-btn-primary tracking-wider text-xs uppercase">
              {article.news_tags && article.news_tags.length > 0
                ? article.news_tags[0]
                : null}
            </span>
            <span aria-hidden="true">•</span>
            <Text size="sm" className="font-medium">
              {formatEdgeDate(article.date)}
            </Text>
          </div>
        </header>

        <ArticleImages images={article.featured_images ?? []} />

        <article className="flex flex-col gap-6">
          <Text
            size="lg"
            className="leading-relaxed text-foreground/90 whitespace-pre-line"
          >
            {article.body}
          </Text>
        </article>
      </Section>
    </main>
  )
}
