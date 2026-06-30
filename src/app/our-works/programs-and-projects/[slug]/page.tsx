import { CalendarDays, Users } from 'lucide-react'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
  markdownToHtml,
} from '@/lib/content/markdown'
import { ArticleContent, Program } from '@/lib/content/types'
import { notFound } from 'next/navigation'
import ArticleDetail from '@/components/ui/article-detail'
import Text from '@/components/ui/text'

const BASE_PATH = '/our-works/programs-and-projects'

export function generateStaticParams() {
  return getCollectionMarkdownData<Program>('programs').map((p) => ({
    slug: p.slug,
  }))
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let program: Program
  try {
    program = getSingleMarkdownData<Program>('programs', `${slug}.md`)
    program.slug = slug
  } catch {
    notFound()
  }

  const bodyHtml = await markdownToHtml(program.body)

  const article: ArticleContent = {
    slug: program.slug,
    title: program.title,
    date: program.date,
    body: program.body,
    featured_images: [program['featured-img']],
    tags: program.tag ? [program.tag] : [],
  }

  return (
    <ArticleDetail
      article={article}
      basePath={BASE_PATH}
      backLabel="Back to Programs & Projects"
      variant="programs"
      status={program.status}
      bodyHtml={bodyHtml}
    >
      {(program.timeline || program.partners) && (
        <div className="mb-8 grid gap-4 rounded-xl border border-foreground/10 bg-surface/50 p-5 sm:grid-cols-2">
          {program.timeline && (
            <div className="flex items-start gap-3">
              <CalendarDays
                className="mt-0.5 size-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <Text size="sm" className="font-semibold">
                  Timeline
                </Text>
                <Text size="sm" className="text-foreground/70">
                  {program.timeline}
                </Text>
              </div>
            </div>
          )}
          {program.partners && (
            <div className="flex items-start gap-3">
              <Users
                className="mt-0.5 size-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <Text size="sm" className="font-semibold">
                  Partners / Type
                </Text>
                <Text size="sm" className="text-foreground/70">
                  {program.partners}
                </Text>
              </div>
            </div>
          )}
        </div>
      )}
    </ArticleDetail>
  )
}
