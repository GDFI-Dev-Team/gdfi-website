import Link from 'next/link'
import { ChevronLeft, CalendarDays, Users } from 'lucide-react'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import ShareButton from '@/components/ui/share-button'
import ArticleImages from '@/components/ui/article-images'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn-merge'
import html from 'remark-html'
import { remark } from 'remark'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
} from '@/lib/content/markdown'
import { Program } from '@/lib/content/types'
import { notFound } from 'next/navigation'

const statusStyles: Record<string, string> = {
  completed: 'bg-status-completed',
  active: 'bg-status-ongoing',
  discontinued: 'bg-status-discontinued',
}

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

  const processedContent = await remark().use(html).process(program.body)
  const contentHtml = processedContent.toString()
  const statusClass =
    statusStyles[program.status.toLowerCase()] ?? 'bg-foreground/20'

  return (
    <Section maxWidth="4xl" sectionClassName="pb-8 pt-28 md:pb-12 md:pt-32">
      <div className="mb-8">
        <Link
          href={BASE_PATH}
          className={cn(
            buttonBase,
            buttonVariants.ghost,
            'gap-1.5 px-0 hover:bg-transparent hover:text-btn-primary',
          )}
        >
          <ChevronLeft size={18} aria-hidden="true" /> Back to Programs &amp;
          Projects
        </Link>
      </div>

      <header className="flex flex-col gap-4 mb-8">
        <Heading level={1} className="text-balance leading-tight">
          {program.title}
        </Heading>

        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 rounded-2xl ${statusClass}`}>
              <Text size="sm" className="text-on-overlay">
                {program.status}
              </Text>
            </span>
            {program.tag && (
              <span className="px-2 rounded-2xl bg-foreground/20">
                <Text size="sm">{program.tag}</Text>
              </span>
            )}
          </div>
          <ShareButton
            url={`${BASE_PATH}/${program.slug}`}
            title={program.title}
            showLabel
            className="h-9 px-4 rounded-full bg-foreground/5 hover:bg-foreground/10"
          />
        </div>
      </header>

      <ArticleImages images={[program['featured-img']]} />

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

      <article
        className="prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </Section>
  )
}
