'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VideoContent } from '@/lib/interfaces/content'
import { formatEdgeDate } from '@/lib/date'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'

function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return m ? m[1] : null
}

const AUTO_ADVANCE_MS = 7000

export default function FeaturedVideoSlideshow({
  videos,
}: {
  videos: VideoContent[]
}) {
  const total = videos.length

  // Clone last at front and first at end for seamless looping in both directions.
  // Layout: [clone-of-last, ...real-slides, clone-of-first]
  const slides = total > 1 ? [videos[total - 1], ...videos, videos[0]] : videos
  const offset = total > 1 ? 1 : 0

  const [index, setIndex] = useState(offset)
  const [animate, setAnimate] = useState(true)
  const [playingPos, setPlayingPos] = useState<number | null>(null)

  const activeIndex = total > 1 ? (index - offset + total) % total : 0

  const goTo = useCallback(
    (realIdx: number) => {
      setPlayingPos(null)
      setAnimate(true)
      setIndex(realIdx + offset)
    },
    [offset],
  )

  const prev = useCallback(() => {
    setPlayingPos(null)
    setAnimate(true)
    setIndex((i) => i - 1)
  }, [])

  const next = useCallback(() => {
    setPlayingPos(null)
    setAnimate(true)
    setIndex((i) => i + 1)
  }, [])

  // When the sliding track lands on a clone, silently jump to the real slide
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

  // Re-enable animation after the silent jump (two rAF frames)
  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    )
    return () => cancelAnimationFrame(id)
  }, [animate])

  // Auto-advance only when nothing is playing
  useEffect(() => {
    if (playingPos !== null || total <= 1) return
    const id = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [playingPos, next, total])

  if (total === 0) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Slide strip + floating arrows */}
      <div className="relative group/slider">
        <div className="overflow-hidden rounded-2xl">
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
            {slides.map((video, i) => {
              const videoId = getYouTubeId(video['youtube-link'])
              const thumbnail = videoId
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : null
              const embedSrc = videoId
                ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                : null
              const isPlaying = playingPos === i

              return (
                <div
                  key={`${String(video.slug)}-${i}`}
                  className="shrink-0 w-full"
                >
                  <div className="relative aspect-video bg-black">
                    {isPlaying && embedSrc ? (
                      <>
                        <iframe
                          key={`yt-${i}`}
                          src={embedSrc}
                          title={video.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full border-0"
                        />
                        <button
                          onClick={() => setPlayingPos(null)}
                          aria-label="Stop video"
                          className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        {thumbnail ? (
                          <Image
                            src={thumbnail}
                            alt={video.title}
                            fill
                            sizes="(min-width: 1024px) calc(100vw - 4rem), 100vw"
                            className="object-cover"
                            priority={i === offset}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                            <Play className="text-white/20" size={56} />
                          </div>
                        )}

                        {/* Scrims — matching Banner pattern */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 via-[45%] to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/10 via-[35%] to-transparent" />

                        {/* Centered play button */}
                        <button
                          onClick={() => setPlayingPos(i)}
                          aria-label={`Play "${video.title}"`}
                          className="absolute inset-0 z-10 flex items-center justify-center group/play"
                        >
                          <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/25 transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-white/20">
                            <Play
                              className="fill-white text-white ml-0.5"
                              size={28}
                            />
                          </div>
                        </button>

                        {/* Info overlay — bottom left */}
                        <div className="absolute inset-x-0 bottom-0 z-20 px-6 py-6 md:px-10 md:py-8 pointer-events-none">
                          <div className="flex flex-col gap-1.5 max-w-2xl">
                            <Text
                              size="xs"
                              className="text-white/60 font-semibold tracking-widest uppercase [text-shadow:0_1px_3px_rgb(0_0_0/0.5)]"
                            >
                              {formatEdgeDate(video.date)}
                            </Text>
                            <Heading
                              level={2}
                              className="text-white text-balance [text-shadow:0_1px_4px_rgb(0_0_0/0.5)]"
                            >
                              {video.title}
                            </Heading>
                            {video.body && (
                              <Text
                                size="sm"
                                className="text-white/75 line-clamp-2 mt-0.5 [text-shadow:0_1px_3px_rgb(0_0_0/0.4)]"
                              >
                                {video.body}
                              </Text>
                            )}
                            <div className="flex gap-3 mt-4 pointer-events-auto">
                              <Link
                                href={`/resources/videos/${video.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white border border-white/25 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Floating arrows — appear on hover */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous featured video"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next featured video"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to featured video ${i + 1}`}
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
