import { JsonLd, videosJsonLd } from '@/lib/seo/json-ld'
import Heading from '@/components/ui/heading'
import VideoGallery from '@/features/resources/video-and-media-resources/components/video-gallery'
import { getVideosPage } from '@/features/resources/video-and-media-resources/data/videos'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video & Media Resources',
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
      <JsonLd data={videosJsonLd(items)} />
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
