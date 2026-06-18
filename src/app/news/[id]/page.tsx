import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { mockNewsArticles } from '@/features/news/data/mock'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
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

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-foreground/5 mb-10 shadow-sm border border-foreground/10">
          {article.isVideo && article.videoUrl ? (
            <iframe
              src={article.videoUrl}
              title={article.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          )}
        </div>

        <article className="flex flex-col gap-6">
          {/* With Markdown/CMS, map over paragraphs or use a rich text renderer here. */}
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
