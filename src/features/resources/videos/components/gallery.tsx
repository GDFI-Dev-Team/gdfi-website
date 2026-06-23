'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
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
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="bg-white/90 rounded-full p-3.5 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play
                    className="text-black fill-black ml-0.5"
                    size={24}
                    aria-hidden="true"
                  />
                </div>
              </div>
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
