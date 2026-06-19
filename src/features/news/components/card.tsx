import Image from 'next/image'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { NewsArticle } from '@/lib/interfaces/NewsArticle'

const CYAN_TAGS = ['updates', 'community-stories']
const FALLBACK_IMAGE =
  'https://pub-a32043e692ef4f1f91a01e5573fd355d.r2.dev/gdfi-website-uploads/web-assetsimg.webp'

export default function NewsCard({ article }: { article: NewsArticle }) {
  // Fallback image allocation during compilation
  const featured_images = article.featured_images?.length
    ? article.featured_images
    : [FALLBACK_IMAGE]

  const hasMultipleImages = featured_images.length > 1

  // Safe Server-Side Date Parsing
  const dateString = article.date
    ? new Date(article.date).toISOString().split('T')[0]
    : 'No Date'

  // Prefer excerpt for preview snippet, fall back safely to body
  const previewText = article.excerpt || article.body

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Article Image Container */}
      <Link
        href={`/news/${article.slug}`}
        className="relative aspect-[3/2] w-full overflow-hidden block bg-foreground/5"
      >
        {/* Carousel Window */}
        <div
          className={cn(
            'flex h-full w-full transition-transform duration-700 ease-in-out',
            // If multiple images exist, slide to the second image purely on CSS group hover
            hasMultipleImages && 'group-hover:-translate-x-100',
          )}
        >
          {featured_images.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                'relative h-full w-full shrink-0',
                // Limits visible DOM overflow until hovered, keeping DOM trees fast
                idx > 1 ? 'hidden' : 'block',
              )}
            >
              <Image
                src={img}
                alt={article.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
              />
            </div>
          ))}
        </div>
      </Link>

      {/* Meta & Text Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {article.news_tags.map((tag) => {
              const isCyanBadge = CYAN_TAGS.includes(tag)
              return (
                <span
                  key={tag}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider whitespace-nowrap',
                    isCyanBadge
                      ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
                      : 'bg-foreground/10 text-foreground/70',
                  )}
                >
                  {tag}
                </span>
              )
            })}
          </div>
          <Text
            size="xs"
            className="text-foreground/50 font-semibold tracking-wider"
          >
            {dateString}
          </Text>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <Link
            href={`/news/${article.slug}`}
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
