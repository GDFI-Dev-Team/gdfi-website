import Heading from '@/components/ui/heading'
import VideoGallery from '@/features/resources/video-and-media-resources/components/video-gallery'
import { getVideosPage } from '@/lib/content/videos'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Resources',
  description: 'Browse all videos from Guiuan Development Foundation Inc.',
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VideoResourcesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const { items, totalPages, querySuffix } = getVideosPage(1, resolvedParams)

  return (
    <>
      <Heading level={2} className="mb-4">
        All Videos
      </Heading>
      <VideoGallery
        videos={items}
        totalPages={totalPages}
        currentPage={1}
        querySuffix={querySuffix}
      />
    </>
  )
}
