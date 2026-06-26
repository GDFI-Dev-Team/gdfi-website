import Image from 'next/image'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { ArticleContent } from '@/lib/interfaces/content'
import { FALLBACK_IMAGE } from '@/config/content'
import { formatEdgeDate } from '@/lib/date'
import { formatReadingTime } from '@/lib/reading-time'

export default function Card({ article }: { article: ArticleContent }) {
  const featured_images = article.featured_images?.length
    ? article.featured_images
    : [FALLBACK_IMAGE]

  const hasMultipleImages = featured_images.length > 1
  const previewText = article.body

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <Link
        href={`/updates/announcements/${article.slug}`}
        className="relative aspect-3/2 w-full overflow-hidden block bg-foreground/5"
      >
        <div
          className={cn(
            'flex h-full w-full transition-transform duration-700 ease-in-out',
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
                alt={`${article.title} - Gallery Image ${idx + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
              />
            </div>
          ))}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <Text
          size="xs"
          className="text-foreground/50 font-semibold tracking-wider"
        >
          {formatEdgeDate(article.date)}
          <span className="mx-1.5">&#xb7;</span>
          {formatReadingTime(article.body)}
        </Text>

        <div className="flex flex-col gap-2 mt-1">
          <Link
            href={`/updates/announcements/${article.slug}`}
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
