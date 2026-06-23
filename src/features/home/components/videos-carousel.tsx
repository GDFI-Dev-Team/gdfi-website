'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { cn } from '@/lib/utils'
import { VideoResource } from '@/features/resources/videos/data/mock'
import VideoModal from '@/features/resources/videos/components/modal'

export default function VideoCarousel({ videos }: { videos: VideoResource[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
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
        className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-hidden"
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
              key={`${video.id}-${i}`}
              className={cn(
                'absolute top-0 left-1/2 w-[80%] md:w-[60%] aspect-video -ml-[40%] md:-ml-[30%] transition-all duration-500 ease-in-out rounded-2xl overflow-hidden shadow-xl',
                isCenter ? 'cursor-default' : 'cursor-pointer',
              )}
              style={{ transform, opacity, zIndex }}
              onClick={() => {
                if (isPrev) prevSlide()
                if (isNext) nextSlide()
              }}
              aria-hidden={isHidden}
            >
              <iframe
                src={`${video.videoUrl}?controls=0&modestbranding=1&showinfo=0`}
                title={video.title}
                className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                tabIndex={-1}
                allowFullScreen
              />

              <button
                onClick={() => isCenter && setPlayingVideo(video.videoUrl)}
                className={cn(
                  'absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-btn-primary/50 focus-visible:ring-inset',
                  isCenter ? 'cursor-pointer' : 'pointer-events-none',
                )}
                aria-label={`Play ${video.title}`}
                tabIndex={isCenter ? 0 : -1}
              />

              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-md tracking-wide">
                {video.duration}
              </div>
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
        <Heading level={3} className="mb-2">
          {displayVideos[currentIndex].title}
        </Heading>
      </div>

      <VideoModal
        videoUrl={playingVideo}
        isOpen={!!playingVideo}
        onClose={() => setPlayingVideo(null)}
      />
    </div>
  )
}
