'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import { VideoContent } from '@/lib/interfaces/video'
import { formatEdgeDate } from '@/lib/date'

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
  // Track which position in `slides` is currently playing an embedded iframe
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

  // Re-enable animation after the silent jump (two rAF frames, matching hero.tsx)
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
    <div className="relative">
      {/* Overflow hidden wrapper so off-screen slides are invisible */}
      <div className="overflow-hidden">
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
            const videoId = getYouTubeId(video.url)
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
                className="shrink-0 w-full flex flex-col px-3"
              >
                <article className="flex-1 bg-foreground/10 rounded-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-stretch">
                  {/* ── Video area ───────────────────────────────── */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg bg-black">
                    {isPlaying && embedSrc ? (
                      <iframe
                        key={`yt-${i}`}
                        src={embedSrc}
                        title={video.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    ) : (
                      <>
                        {thumbnail ? (
                          <Image
                            src={thumbnail}
                            alt={video.title}
                            fill
                            sizes="(min-width: 1024px) 66vw, 100vw"
                            className="object-cover"
                            priority={i === offset}
                            loading={i === offset ? undefined : 'eager'}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
                            <Play className="text-foreground/30" size={56} />
                          </div>
                        )}

                        {/* Scrim */}
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Play button */}
                        <button
                          onClick={() => setPlayingPos(i)}
                          aria-label={`Play "${video.title}"`}
                          className="absolute inset-0 flex items-center justify-center group/play"
                        >
                          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm ring-2 ring-white/30 transition-transform duration-300 group-hover/play:scale-110">
                            <Play
                              className="fill-white text-white ml-1"
                              size={32}
                            />
                          </div>
                        </button>
                      </>
                    )}
                  </div>

                  {/* ── Info area ────────────────────────────────── */}
                  <div className="flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <Text
                        size="xs"
                        className="text-foreground/50 font-semibold tracking-wider"
                      >
                        {formatEdgeDate(video.date)}
                      </Text>
                      <Heading
                        level={2}
                        className="text-2xl md:text-2xl lg:text-2xl"
                      >
                        {video.title}
                      </Heading>
                      {(video.excerpt && (
                        <Text className="line-clamp-4 text-foreground/70">
                          {video.excerpt}
                        </Text>
                      )) ||
                        (video.body && (
                          <Text className="line-clamp-4 text-foreground/70">
                            {video.body}
                          </Text>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="px-4 py-2" variant="primary">
                          Watch <ExternalLink className="ml-2 size-4" />
                        </Button>
                      </Link>
                      <Link href={`/resources/videos/${video.slug}`}>
                        <Button className="px-4 py-2" variant="secondary">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────────────────────── */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={prev}
            aria-label="Previous featured video"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-foreground/20 bg-background hover:bg-hover text-foreground/60 hover:text-foreground transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to featured video ${i + 1}`}
                aria-current={i === activeIndex}
                className={cn(
                  'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                  i === activeIndex
                    ? 'w-8 bg-foreground'
                    : 'w-4 bg-foreground/30 hover:bg-foreground/60',
                )}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next featured video"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-foreground/20 bg-background hover:bg-hover text-foreground/60 hover:text-foreground transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
