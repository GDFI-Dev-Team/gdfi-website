'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { NewsArticle } from '../data/mock'

export default function NewsCard({ article }: { article: NewsArticle }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const images = article.images?.length
    ? article.images
    : [{ src: '/placeholder-image.webp', caption: '' }]
  const hasMultipleImages = images.length > 1

  useEffect(() => {
    if (!isHovered || !hasMultipleImages) return

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [isHovered, hasMultipleImages, images.length])

  const isCyanBadge =
    article.category === 'UPDATES' || article.category === 'COMMUNITY STORIES'
  const badgeClasses = isCyanBadge
    ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
    : 'bg-foreground/10 text-foreground/70'

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setImageIndex(0)
      }}
    >
      <Link
        href={`/news/${article.id}`}
        className="relative aspect-[3/2] w-full overflow-hidden block"
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${imageIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative h-full w-full shrink-0">
              <Image
                src={img.src}
                alt={img.caption || article.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
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
