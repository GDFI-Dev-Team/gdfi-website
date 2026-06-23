import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
} from '@/lib/markdown'
import { formatEdgeDate } from '@/lib/date'
import { BaseContent } from '@/lib/interfaces/content'
import Link from 'next/link'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import ArticleImages from '@/features/updates/announcements/components/article-images'

export function generateStaticParams() {
  const articles = getCollectionMarkdownData<BaseContent>(
    'updates/announcements',
  )
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params

  let article: BaseContent
  try {
    article = getSingleMarkdownData<BaseContent>(
      'updates/announcements',
      `${slug}.md`,
    )
  } catch {
    notFound()
  }

  return (
    <Section maxWidth="4xl" sectionClassName="py-8 md:py-12">
      <div className="mb-8">
        <Link href="/updates/announcements" className="inline-flex">
          <Button
            variant="ghost"
            className="gap-2 px-0 hover:bg-transparent hover:text-btn-primary"
          >
            <ChevronLeft size={18} aria-hidden="true" /> Back to Announcements
          </Button>
        </Link>
      </div>

      <header className="flex flex-col gap-4 mb-8">
        <Heading level={1} className="text-balance leading-tight">
          {article.title}
        </Heading>

        <div className="flex items-center gap-3 text-foreground/60 mt-2">
          <Text size="sm" className="font-medium">
            {formatEdgeDate(article.date)}
          </Text>
        </div>
      </header>

      {/* Array slideshow */}
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
  )
}
