'use client'

import { useState } from 'react'
import { VideoContent } from '@/lib/content/types'
import VideoCard from './video-card'
import VideoModal from './modal'
import Pagination from '@/components/ui/pagination'

interface VideoGalleryProps {
  videos: (VideoContent & { slug: string })[]
  totalPages: number
  currentPage: number
  querySuffix: string
}

export default function VideoGallery({
  videos,
  totalPages,
  currentPage,
  querySuffix,
}: VideoGalleryProps) {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)

  return (
    <>
      {videos.length > 0 ? (
        <>
          <ul className="flex flex-col gap-8 list-none p-0 m-0">
            {videos.map((video) => (
              <li key={video.slug} className="flex flex-col">
                <VideoCard video={video} onPlay={setSelectedUrl} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/resources/video-resources/page"
              searchParamsSuffix={querySuffix}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12 border border-dashed border-foreground/10 rounded-xl bg-background/50">
          <p className="text-foreground/50 text-sm font-medium">
            No videos match your active filter criteria.
          </p>
        </div>
      )}

      <VideoModal
        videoUrl={selectedUrl}
        isOpen={!!selectedUrl}
        onClose={() => setSelectedUrl(null)}
      />
    </>
  )
}
