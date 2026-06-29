import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
} from '@/lib/content/markdown'
import { formatEdgeDate } from '@/lib/utils/date'
import { ArticleContent } from '@/lib/content/types'
import Link from 'next/link'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import ArticleImages from '@/components/ui/article-images'

export function generateStaticParams() {
  const articles = getCollectionMarkdownData<ArticleContent>(
    'updates/announcements',
  )
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let article: ArticleContent
  try {
    article = getSingleMarkdownData<ArticleContent>(
      'updates/announcements',
      `${slug}.md`,
    )
  } catch {
    notFound()
  }

  return (
    <Section maxWidth="4xl" sectionClassName="pb-8 pt-28 md:pb-12 md:pt-32">
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

        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-3 text-foreground/60">
            <Text size="sm" className="font-medium">
              {formatEdgeDate(article.date)}
            </Text>
          </div>
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
