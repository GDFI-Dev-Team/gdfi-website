import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { mockNewsArticles } from '@/features/news/data/mock'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import ArticleImages from '@/features/news/components/article-images'

export function generateStaticParams() {
  return mockNewsArticles.map((article) => ({
    id: article.id,
  }))
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const article = mockNewsArticles.find((a) => a.id === resolvedParams.id)

  if (!article) notFound()

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
              {article.category}
            </span>
            <span aria-hidden="true">•</span>
            <Text size="sm" className="font-medium">
              {article.date}
            </Text>
          </div>
        </header>

        {article.isVideo && article.videoUrl ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-foreground/5 mb-10 shadow-sm border border-foreground/10">
            <iframe
              src={article.videoUrl}
              title={article.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : (
          <ArticleImages images={article.images || []} />
        )}

        <article className="flex flex-col gap-6">
          {/* With Markdown/CMS, map over paragraphs or use a rich text renderer here. */}
          <Text
            size="lg"
            className="leading-relaxed text-foreground/90 whitespace-pre-line"
          >
            {article.content}
          </Text>
        </article>
      </Section>
    </main>
  )
}
