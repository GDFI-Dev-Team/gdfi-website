'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'
import VideoModal from '@/features/resources/videos/modal'
import { VideoContent } from '@/lib/interfaces/content'
import Text from '@/components/ui/text'

function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return m ? m[1] : null
}

export default function VideoCarousel({ videos }: { videos: VideoContent[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingUrl, setPlayingUrl] = useState<string | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const displayVideos = videos.length === 2 ? [...videos, ...videos] : videos
  const len = displayVideos.length

  if (len === 0) return null

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % len)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + len) % len)

  const minSwipeDistance = 50
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

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div
        className="relative w-full h-[250px] sm:h-[220px] md:h-[320px] lg:h-[370px] flex items-center justify-center overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {displayVideos.map((video, i) => {
          let offset = i - currentIndex
          if (offset < -Math.floor(len / 2)) offset += len
          if (offset > Math.floor(len / 2)) offset -= len

          const isCenter = offset === 0
          const isPrev = offset === -1
          const isNext = offset === 1
          const isHidden = Math.abs(offset) > 1

          const videoId = getYouTubeId(video['youtube-link'])
          const thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : null
          const embedUrl = videoId
            ? `https://www.youtube.com/embed/${videoId}`
            : null

          let transform = 'translateX(0) scale(1)'
          let opacity = 1
          let zIndex = 30

          if (isPrev) {
            transform = 'translateX(-85%) scale(0.85)'
            opacity = 0.4
            zIndex = 20
          } else if (isNext) {
            transform = 'translateX(85%) scale(0.85)'
            opacity = 0.4
            zIndex = 20
          } else if (isHidden) {
            transform = `translateX(${offset < 0 ? '-150%' : '150%'}) scale(0.7)`
            opacity = 0
            zIndex = 10
          }

          return (
            <div
              key={`${video.slug}-${i}`}
              className={cn(
                'absolute top-0 left-1/2 w-[80%] md:w-[60%] aspect-video -ml-[40%] md:-ml-[30%] transition-all duration-500 ease-in-out rounded-2xl overflow-hidden shadow-xl bg-black',
                isCenter ? 'cursor-default' : 'cursor-pointer',
              )}
              style={{ transform, opacity, zIndex }}
              onClick={() => {
                if (isPrev) prevSlide()
                if (isNext) nextSlide()
              }}
              aria-hidden={isHidden}
            >
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={video.title}
                  fill
                  sizes="(min-width: 768px) 60vw, 80vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-foreground/10" />
              )}

              <button
                onClick={() => isCenter && embedUrl && setPlayingUrl(embedUrl)}
                className={cn(
                  'absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-btn-primary/50 focus-visible:ring-inset',
                  isCenter ? 'cursor-pointer' : 'pointer-events-none',
                )}
                aria-label={`Play ${video.title}`}
                tabIndex={isCenter ? 0 : -1}
              >
                {isCenter && (
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 hover:scale-110 hover:bg-black/75">
                    <Play className="fill-white text-white ml-0.5" size={24} />
                  </div>
                )}
              </button>
            </div>
          )
        })}

        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 hidden md:flex justify-between pointer-events-none z-40">
          <Button
            variant="secondary"
            className="pointer-events-auto h-12 w-12 rounded-full p-0 bg-background/80 backdrop-blur-sm border-transparent text-foreground hover:bg-background shadow-md"
            onClick={prevSlide}
            aria-label="Previous video"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="secondary"
            className="pointer-events-auto h-12 w-12 rounded-full p-0 bg-background/80 backdrop-blur-sm border-transparent text-foreground hover:bg-background shadow-md"
            onClick={nextSlide}
            aria-label="Next video"
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center max-w-2xl px-4 animate-fade-in">
        <Text size="lg" className="font-semibold">
          {displayVideos[currentIndex].title}
        </Text>
      </div>

      <VideoModal
        videoUrl={playingUrl}
        isOpen={!!playingUrl}
        onClose={() => setPlayingUrl(null)}
      />
    </div>
  )
}
