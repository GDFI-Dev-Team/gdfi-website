import Image from 'next/image'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import ShareButton from '@/components/ui/share-button'
import { CalendarDays } from 'lucide-react'
import { Tag, TagList } from '@/components/ui/tag'
import { cn } from '@/lib/utils/cn-merge'
import { ArticleContent } from '@/lib/content/types'
import { formatEdgeDate } from '@/lib/utils/date'
import { getReadingTime } from '@/lib/content/reading-time'
import { toPlainText } from '@/lib/content/markdown'
import { statusClass } from '@/lib/content/programs'

export type ArticleVariant = 'announcements' | 'stories' | 'programs'

export default function ArticleCard({
  article,
  basePath,
  variant = 'stories',
  fallbackImgUrl,
  status,
  dateRange,
  className,
}: {
  article: ArticleContent
  basePath: string
  variant?: ArticleVariant
  fallbackImgUrl: string
  /** Programs only — status pill label (e.g. "Active"). */
  status?: string
  /** Programs only — date range shown below the title (e.g. "2025 – ongoing"). */
  dateRange?: string
  className?: string
}) {
  const href = `${basePath}/${article.slug}`
  const categories = article.tags ?? []
  const featured_images = article.featured_images?.length
    ? article.featured_images
    : [fallbackImgUrl]

  const hasMultipleImages = featured_images.length > 1
  const previewText = article.excerpt?.trim() || toPlainText(article.body)

  return (
    <article
      className={cn(
        'group relative flex flex-col h-full overflow-hidden rounded-xl shadow-sm transition-all duration-300 border border-foreground/10 bg-background hover:shadow-md hover:-translate-y-1',
        className,
      )}
    >
      <div className="absolute top-2 right-2 z-20 md:top-4 md:right-4">
        <ShareButton
          url={href}
          title={article.title}
          className="h-7 w-7 p-0 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm border-none md:h-9 md:w-9"
        />
      </div>

      <Link
        href={href}
        className="relative w-full overflow-hidden block bg-foreground/5 aspect-3/2"
      >
        <figure
          className={cn(
            'flex h-full w-full m-0 transition-transform duration-700 ease-in-out',
            hasMultipleImages && 'group-hover:-translate-x-full',
          )}
        >
          {featured_images.map((img: string, idx: number) => (
            <div
              key={`${article.slug}-img-${idx}`}
              className={cn(
                'relative h-full w-full shrink-0',
                idx > 1 ? 'hidden' : 'block',
              )}
            >
              <Image
                src={img}
                alt={`${article.title}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
              />
            </div>
          ))}
        </figure>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 md:gap-3 md:p-6">
        {variant === 'announcements' ? (
          <time
            dateTime={
              article.date ? new Date(article.date).toISOString() : undefined
            }
            className="text-xs text-foreground/50 font-semibold tracking-wider block"
          >
            {formatEdgeDate(article.date)}
            <span className="mx-1.5">&#xb7;</span>
            {getReadingTime(article.body)} min. read
          </time>
        ) : variant === 'programs' ? (
          <div className="flex flex-wrap gap-1.5 md:gap-3">
            {status && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 md:px-3 md:py-1.5',
                  statusClass(status),
                )}
              >
                <Text size="xs" className="text-on-overlay">
                  {status}
                </Text>
              </span>
            )}
            {categories[0] && (
              <Tag label={categories[0]} variant="card" tone="category" />
            )}
          </div>
        ) : (
          <TagList tags={categories} variant="card" />
        )}

        <div className="flex flex-col gap-1 md:gap-2">
          <Link
            href={href}
            className="hover:underline decoration-foreground/30 underline-offset-4"
          >
            <Heading
              level={4}
              className="line-clamp-2 text-sm leading-snug md:text-lg lg:text-xl"
            >
              {article.title}
            </Heading>
          </Link>

          {variant === 'programs' && dateRange && (
            <div className="flex items-center gap-1.5 text-foreground/55">
              <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
              <Text size="sm" className="text-xs md:text-sm">
                {dateRange}
              </Text>
            </div>
          )}

          <Text
            size="sm"
            className="line-clamp-2 text-xs text-foreground/60 md:line-clamp-3 md:text-sm"
          >
            {previewText}
          </Text>
        </div>
      </div>
    </article>
  )
}
