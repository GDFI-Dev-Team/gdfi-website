import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import ShareButton from '@/components/ui/share-button'
import ArticleImages from '@/components/ui/article-images'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { formatEdgeDate } from '@/lib/utils/date'
import { getReadingTime } from '@/lib/content/reading-time'
import { categoryColor } from '@/features/updates/community-stories/data/category-colors'
import { ArticleContent } from '@/lib/content/types'
import { cn } from '@/lib/utils/cn-merge'

export default function ArticleDetail({
  article,
  basePath,
  backLabel,
  showDate = false,
}: {
  article: ArticleContent
  basePath: string
  backLabel: string
  showDate?: boolean
}) {
  const categories = article.tags ?? []
  return (
    <Section maxWidth="4xl" sectionClassName="pb-8 pt-28 md:pb-12 md:pt-32">
      <div className="mb-8">
        <Link
          href={basePath}
          className={cn(
            buttonBase,
            buttonVariants.ghost,
            'gap-1.5 px-0 hover:bg-transparent hover:text-btn-primary',
          )}
        >
          <ChevronLeft size={18} aria-hidden="true" /> {backLabel}
        </Link>
      </div>

      <header className="flex flex-col gap-4 mb-8">
        <Heading level={1} className="text-balance leading-tight">
          {article.title}
        </Heading>

        <div className="flex items-center justify-between gap-4 mt-2">
          {showDate ? (
            <Text
              size="sm"
              className="text-foreground/50 font-semibold tracking-wider"
            >
              {formatEdgeDate(article.date)}
              <span className="mx-1.5">&#xb7;</span>
              {getReadingTime(article.body)} min. read
            </Text>
          ) : categories.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {categories.map((category) => {
                const color = categoryColor(category)
                return (
                  <span
                    key={category}
                    className="rounded-full px-4 py-2"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    <Text size="sm" className="font-semibold tracking-wide">
                      {category}
                    </Text>
                  </span>
                )
              })}
            </div>
          ) : (
            <span />
          )}
          <ShareButton
            url={`${basePath}/${article.slug}`}
            title={article.title}
            showLabel
            className="h-9 px-4 rounded-full bg-foreground/5 hover:bg-foreground/10"
          />
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
