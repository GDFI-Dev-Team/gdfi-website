'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArticleImage } from '../data/mock'

export default function ArticleImages({ images }: { images: ArticleImage[] }) {
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) return null

  const isMultiple = images.length > 1
  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length)
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="flex flex-col w-full mb-10">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-foreground/5 shadow-sm border border-foreground/10 group">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image
                src={img.src}
                alt={img.caption || `Article image ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {isMultiple && (
          <>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="secondary"
                className="pointer-events-auto h-10 w-10 rounded-full p-0 bg-background/80 backdrop-blur-sm border-transparent text-foreground hover:bg-background"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="secondary"
                className="pointer-events-auto h-10 w-10 rounded-full p-0 bg-background/80 backdrop-blur-sm border-transparent text-foreground hover:bg-background"
                onClick={nextSlide}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-background/40 backdrop-blur-md px-3 py-2 rounded-full">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50 hover:bg-white/80',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-3 flex justify-between items-start gap-4 px-2">
        <Text size="sm" className="italic text-foreground/60">
          {' '}
          {images[index].caption}{' '}
        </Text>
        {isMultiple && (
          <Text
            size="sm"
            className="text-foreground/40 whitespace-nowrap font-medium"
          >
            {index + 1} / {images.length}{' '}
          </Text>
        )}
      </div>
    </div>
  )
}
