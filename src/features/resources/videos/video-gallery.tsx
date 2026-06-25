'use client'

import { useState } from 'react'
import { VideoContent } from '@/lib/interfaces/content'
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
          <div className="flex flex-col gap-8">
            {videos.map((video) => (
              <VideoCard
                key={video.slug}
                video={video}
                onPlay={setSelectedUrl}
              />
            ))}
          </div>

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
