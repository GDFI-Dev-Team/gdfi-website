'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn-merge'
import Image from 'next/image'

const AUTO_ADVANCE_MS = 6000

export default function MVCSlideshow({
  images,
  alt = '',
  className,
}: {
  images: string[]
  alt?: string
  className?: string
}) {
  const total = images.length

  // Clone last at front and first at end for seamless looping in both directions.
  // Layout: [clone-of-last, ...real-slides, clone-of-first]
  const slides = total > 1 ? [images[total - 1], ...images, images[0]] : images
  const offset = total > 1 ? 1 : 0

  const [index, setIndex] = useState(offset)
  const [animate, setAnimate] = useState(true)

  const activeIndex = total > 1 ? (index - offset + total) % total : 0

  const goTo = useCallback(
    (realIdx: number) => {
      setAnimate(true)
      setIndex(realIdx + offset)
    },
    [offset],
  )

  const prev = useCallback(() => {
    setAnimate(true)
    setIndex((i) => i - 1)
  }, [])

  const next = useCallback(() => {
    setAnimate(true)
    setIndex((i) => i + 1)
  }, [])

  // When the sliding track lands on a clone, silently jump to the real slide.
  const handleRest = () => {
    if (total <= 1) return
    if (index >= total + offset) {
      setAnimate(false)
      setIndex(offset)
    } else if (index < offset) {
      setAnimate(false)
      setIndex(total + offset - 1)
    }
  }

  // Re-enable animation after the silent jump (two rAF frames).
  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    )
    return () => cancelAnimationFrame(id)
  }, [animate])

  // Auto-advance.
  useEffect(() => {
    if (total <= 1) return
    const id = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [next, total])

  if (total === 0) return null

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Slide strip + floating arrows */}
      <div className="relative group/slider">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: animate
                ? 'transform 550ms cubic-bezier(0.32, 0.72, 0, 1)'
                : 'none',
            }}
            onTransitionEnd={handleRest}
          >
            {slides.map((src, i) => (
              <div key={`${src}-${i}`} className="shrink-0 w-full">
                <div className="relative aspect-[4/3] bg-foreground/5">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={i === offset}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edge arrows — bare icons over an inward-fading, theme-aware gradient */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="group/arrow absolute inset-y-0 left-0 z-30 flex cursor-pointer items-center justify-start pl-3 focus:outline-none"
            >
              <ChevronLeft
                size={28}
                className="text-foreground opacity-0 transition-all duration-300 group-hover/slider:opacity-100 group-hover/arrow:-translate-x-0.5 group-focus-visible/arrow:opacity-100"
              />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="group/arrow absolute inset-y-0 right-0 z-30 flex cursor-pointer items-center justify-end pr-3 focus:outline-none"
            >
              <ChevronRight
                size={28}
                className="text-foreground opacity-0 transition-all duration-300 group-hover/slider:opacity-100 group-hover/arrow:translate-x-0.5 group-focus-visible/arrow:opacity-100"
              />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === activeIndex}
              className={cn(
                'h-1 cursor-pointer rounded-full transition-all duration-300',
                i === activeIndex
                  ? 'w-8 bg-foreground'
                  : 'w-3 bg-foreground/25 hover:bg-foreground/50',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
