'use client'

import { useState } from 'react'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { VideoContent } from '@/lib/interfaces/video'
import { formatEdgeDate } from '@/lib/date'
import VideoModal from './modal'

function toEmbedUrl(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}

export default function VideoGallery({
  videos,
}: {
  videos: (VideoContent & { slug: string })[]
}) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)

  return (
    <>
      <div className="flex flex-col gap-6">
        {videos.map((video) => {
          const embedUrl = toEmbedUrl(video.url)

          return (
            <div
              key={video.slug}
              onClick={() => embedUrl && setSelectedUrl(embedUrl)}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') &&
                embedUrl &&
                setSelectedUrl(embedUrl)
              }
              role="button"
              tabIndex={0}
              aria-label={`Play ${video.title}`}
              className="group flex flex-col md:flex-row gap-6 p-4 -mx-4 rounded-2xl border border-transparent hover:border-foreground/10 hover:bg-foreground/3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
            >
              <div className="relative w-full md:w-72 lg:w-80 aspect-video shrink-0 rounded-xl overflow-hidden bg-foreground/5 shadow-sm">
                {embedUrl ? (
                  <iframe
                    src={`${embedUrl}?controls=0&modestbranding=1&showinfo=0`}
                    title={video.title}
                    className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                    tabIndex={-1}
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
                    <Text size="xs" className="text-foreground/40">
                      No preview
                    </Text>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center gap-2 flex-1 min-w-0 py-2">
                <Text
                  size="xs"
                  className="text-foreground/60 font-semibold tracking-wider"
                >
                  {formatEdgeDate(video.date)}
                </Text>

                <Heading
                  level={3}
                  className="line-clamp-2 leading-snug group-hover:text-btn-primary transition-colors"
                >
                  {video.title}
                </Heading>

                {(video.excerpt || video.body) && (
                  <Text
                    size="sm"
                    className="text-foreground/60 line-clamp-2 md:line-clamp-3 mt-1"
                  >
                    {video.excerpt || video.body}
                  </Text>
                )}

                <Link
                  href={`/resources/videos/${video.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 text-xs font-semibold text-btn-primary underline-offset-4 hover:underline w-fit"
                >
                  View Details
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <VideoModal
        videoUrl={selectedUrl}
        isOpen={!!selectedUrl}
        onClose={() => setSelectedUrl(null)}
      />
    </>
  )
}
