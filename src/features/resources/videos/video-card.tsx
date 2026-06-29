'use client'

import { Play } from 'lucide-react'
import { VideoContent } from '@/lib/content/types'
import { formatEdgeDate } from '@/lib/utils/date'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import ShareButton from '@/components/ui/share-button'

function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return m ? m[1] : null
}

function toEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${id}`
}

export default function VideoCard({
  video,
  onPlay,
}: {
  video: VideoContent & { slug: string }
  onPlay: (embedUrl: string) => void
}) {
  const videoId = getYouTubeId(video['youtube-link'])
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null
  const embedUrl = videoId ? toEmbedUrl(videoId) : null

  return (
    <div
      onClick={() => embedUrl && onPlay(embedUrl)}
      onKeyDown={(e) =>
        (e.key === 'Enter' || e.key === ' ') && embedUrl && onPlay(embedUrl)
      }
      role="button"
      tabIndex={0}
      aria-label={`Play ${video.title}`}
      className="group flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-transparent hover:border-foreground/10 bg-foreground/3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
    >
      <div className="relative w-full md:w-72 lg:w-80 aspect-video shrink-0 rounded-xl overflow-hidden bg-foreground/5 shadow-sm">
        {thumbnail ? (
          <>
            <Image
              src={thumbnail}
              alt={video.title}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/75">
                <Play className="fill-white text-white ml-0.5" size={20} />
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
            <Play className="text-foreground/30" size={32} />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center gap-2 flex-1 min-w-0 py-2">
        <div className="flex items-center justify-between gap-2">
          <Text
            size="xs"
            className="text-foreground/60 font-semibold tracking-wider"
          >
            {formatEdgeDate(video.date)}
          </Text>
          <ShareButton
            url="/resources/video-resources"
            title={video.title}
            className="h-8 w-8 p-0 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/10 z-10 relative"
          />
        </div>

        <Heading
          level={3}
          className="line-clamp-2 leading-snug group-hover:text-btn-primary transition-colors"
        >
          {video.title}
        </Heading>

        {video.body && (
          <Text size="sm" className="text-foreground/60 mt-1">
            {video.body}
          </Text>
        )}
      </div>
    </div>
  )
}
