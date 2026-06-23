'use client'

import { useState } from 'react'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { VideoResource } from '../data/mock'
import VideoModal from './modal'

export default function VideoGallery({ videos }: { videos: VideoResource[] }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  return (
    <>
      <div className="flex flex-col gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video.videoUrl)}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') &&
              setSelectedVideo(video.videoUrl)
            }
            role="button"
            tabIndex={0}
            aria-label={`Play ${video.title}`}
            className="group flex flex-col md:flex-row gap-6 p-4 -mx-4 rounded-2xl border border-transparent hover:border-foreground/10 hover:bg-foreground/3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
          >
            <div className="relative w-full md:w-72 lg:w-80 aspect-video shrink-0 rounded-xl overflow-hidden bg-foreground/5 shadow-sm">
              <iframe
                src={`${video.videoUrl}?controls=0&modestbranding=1&showinfo=0`}
                title={video.title}
                className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                tabIndex={-1}
                allowFullScreen
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-md tracking-wide">
                {video.duration}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 flex-1 min-w-0 py-2">
              <div className="flex items-center gap-3 text-foreground/60">
                <Text size="xs" className="font-semibold tracking-wider">
                  {video.date}
                </Text>
              </div>

              <Heading
                level={3}
                className="line-clamp-2 leading-snug group-hover:text-btn-primary transition-colors"
              >
                {video.title}
              </Heading>

              <Text
                size="sm"
                className="text-foreground/60 line-clamp-2 md:line-clamp-3 mt-1"
              >
                {video.description}
              </Text>
            </div>
          </div>
        ))}
      </div>

      <VideoModal
        videoUrl={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  )
}
