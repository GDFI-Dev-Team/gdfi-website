import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { NewsArticle } from '../data/mock'

export default function NewsCard({ article }: { article: NewsArticle }) {
  const isCyanBadge =
    article.category === 'UPDATES' || article.category === 'COMMUNITY STORIES'
  const badgeClasses = isCyanBadge
    ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
    : 'bg-foreground/10 text-foreground/70'

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <Link
        href={`/news/${article.id}`}
        className="relative aspect-[3/2] w-full overflow-hidden block"
      >
        <Image
          src={article.images?.[0]?.src || '/placeholder-image.webp'}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {article.isVideo && (
          <>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 rounded-xl p-3.5 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play
                  className="text-black fill-black"
                  size={20}
                  aria-hidden="true"
                />
              </div>
            </div>
            {article.duration && (
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-md tracking-wide">
                {article.duration}
              </div>
            )}
          </>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider',
              badgeClasses,
            )}
          >
            {article.category}
          </span>
          <Text
            size="xs"
            className="text-foreground/50 font-semibold tracking-wider"
          >
            {article.date}
          </Text>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <Link
            href={`/news/${article.id}`}
            className="hover:underline decoration-foreground/30 underline-offset-4"
          >
            <Heading level={4} className="line-clamp-2 leading-snug">
              {article.title}
            </Heading>
          </Link>
          <Text size="sm" className="text-foreground/60 line-clamp-3">
            {article.content}
          </Text>
        </div>
      </div>
    </article>
  )
}
