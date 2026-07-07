'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn-merge'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'

export default function ArticleImages({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const isMultiple = images.length > 1
  const minSwipeDistance = 50

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) nextSlide()
    else if (distance < -minSwipeDistance) prevSlide()
  }

  useEffect(() => {
    if (lightboxOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, nextSlide, prevSlide])

  if (!images || images.length === 0) return null

  return (
    <>
      <figure
        className="flex flex-col w-full mb-10 m-0"
        role="group"
        aria-roledescription="carousel"
        aria-label="Article images"
      >
        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden group"
          onTouchStart={isMultiple ? onTouchStart : undefined}
          onTouchMove={isMultiple ? onTouchMove : undefined}
          onTouchEnd={isMultiple ? onTouchEnd : undefined}
        >
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="relative h-full w-full shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`Image ${i + 1} of ${images.length}`}
                aria-hidden={i !== index}
              >
                <Image
                  src={src}
                  alt={`Article image ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="object-contain select-none"
                  priority={i === 0}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full p-0 bg-background/80 backdrop-blur-sm border-transparent text-foreground hover:bg-background opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 focus-visible:opacity-100 shadow-sm"
            aria-label="View full screen"
          >
            <Maximize2 size={18} aria-hidden="true" />
          </Button>

          {isMultiple && (
            <>
              <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="secondary"
                  className="pointer-events-auto h-10 w-10 rounded-full p-0 bg-background/80 backdrop-blur-sm border-transparent text-foreground hover:bg-background shadow-sm"
                  onClick={prevSlide}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </Button>
                <Button
                  variant="secondary"
                  className="pointer-events-auto h-10 w-10 rounded-full p-0 bg-background/80 backdrop-blur-sm border-transparent text-foreground hover:bg-background shadow-sm"
                  onClick={nextSlide}
                  aria-label="Next image"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-background/40 backdrop-blur-md px-3 py-2 rounded-full">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? 'true' : 'false'}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === index
                        ? 'w-6 bg-foreground'
                        : 'w-1.5 bg-foreground/30 hover:bg-foreground/60',
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {isMultiple && (
          <figcaption className="mt-3 flex justify-end px-2">
            <Text
              size="sm"
              className="text-foreground/50 whitespace-nowrap font-medium"
              aria-live="polite"
            >
              {index + 1} / {images.length}
            </Text>
          </figcaption>
        )}
      </figure>

      {lightboxOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 animate-fade-in"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <Button
              variant="ghost"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 h-12 w-12 rounded-full p-0 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-colors"
              aria-label="Close fullscreen"
            >
              <X size={24} aria-hidden="true" />
            </Button>

            <div
              className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={isMultiple ? onTouchStart : undefined}
              onTouchMove={isMultiple ? onTouchMove : undefined}
              onTouchEnd={isMultiple ? onTouchEnd : undefined}
            >
              <Image
                src={images[index]}
                alt={`Fullscreen image ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain select-none"
                priority
                draggable={false}
              />

              {isMultiple && (
                <>
                  <Button
                    variant="ghost"
                    onClick={prevSlide}
                    className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full p-0 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={28} aria-hidden="true" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={nextSlide}
                    className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full p-0 bg-white/10 text-white hover:bg-white/20 hover:text-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={28} aria-hidden="true" />
                  </Button>

                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest">
                    {index + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
