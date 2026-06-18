import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { mockNewsArticles } from '@/features/news/data/mock'
import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'

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
    <main className="flex-1 flex flex-col bg-background">
      <Banner
        title={article.title}
        description={`${article.category} • ${article.date}`}
        imgUrl={article.image}
      />
      <Section maxWidth="4xl" sectionClassName="py-12 md:py-20">
        <div className="mb-10">
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

        <article className="flex flex-col gap-6">
          {/* With Markdown/CMS, map over paragraphsor use a rich text renderer here. For now, we render the mock content string. */}
          <Text
            size="lg"
            className="leading-relaxed text-foreground/90 whitespace-pre-line"
          >
            {article.content}
          </Text>

          {/* Placeholder for additional paragraphs to show layout */}
          <Text size="lg" className="leading-relaxed text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text size="lg" className="leading-relaxed text-foreground/90">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        </article>
      </Section>
    </main>
  )
}
