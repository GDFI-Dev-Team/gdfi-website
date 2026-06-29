import Image from 'next/image'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils/cn-merge'
import { ArticleContent } from '@/lib/content/types'
import { formatEdgeDate } from '@/lib/utils/date'
import { getReadingTime } from '@/lib/content/reading-time'
import { categoryColor } from '../../features/updates/community-stories/data/category-colors'

export default function ArticleCard({
  article,
  basePath,
  showDate = false,
  fallbackImgUrl,
  className,
}: {
  article: ArticleContent
  basePath: string
  showDate?: boolean
  fallbackImgUrl: string
  className?: string
}) {
  const href = `${basePath}/${article.slug}`
  const categories = article.tags ?? []
  const featured_images = article.featured_images?.length
    ? article.featured_images
    : [fallbackImgUrl]

  const hasMultipleImages = featured_images.length > 1
  const previewText = article.body

  return (
    <article
      className={cn(
        'group flex flex-col h-full overflow-hidden rounded-xl shadow-sm transition-all duration-300 border border-foreground/10 bg-background hover:shadow-md hover:-translate-y-1',
        className,
      )}
    >
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

      <div className="flex flex-1 flex-col gap-3 p-6">
        {showDate ? (
          <time
            dateTime={new Date(article.date).toISOString()}
            className="text-xs text-foreground/50 font-semibold tracking-wider block"
          >
            {formatEdgeDate(article.date)}
            <span className="mx-1.5">&#xb7;</span>
            {getReadingTime(article.body)} min. read
          </time>
        ) : (
          categories.length > 0 && (
            <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
              {categories.map((category) => {
                const color = categoryColor(category)
                return (
                  <li
                    key={category}
                    className="rounded-full px-3 py-1.5"
                    style={{ backgroundColor: color.bg, color: color.text }}
                  >
                    <Text size="xs" className="font-semibold tracking-wide">
                      {category}
                    </Text>
                  </li>
                )
              })}
            </ul>
          )
        )}

        <div className="flex flex-col gap-2">
          <Link
            href={href}
            className="hover:underline decoration-foreground/30 underline-offset-4"
          >
            <Heading level={4} className="line-clamp-2 leading-snug">
              {article.title}
            </Heading>
          </Link>
          <Text size="sm" className="text-foreground/60 line-clamp-3">
            {previewText}
          </Text>
        </div>
      </div>
    </article>
  )
}
