import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Pagination from '@/components/ui/pagination'
import VideoGallery from '@/features/resources/videos/video-gallery'
import FeaturedVideoSlideshow from '@/features/resources/videos/featured-video-slideshow'
import { getAllVideos, getVideosPage } from '@/lib/videos'
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
  const allVideos = getAllVideos()
  const { items, totalPages, querySuffix } = getVideosPage(1, resolvedParams)

  const featuredVideos = allVideos.filter((v) =>
    v.tags?.some((t) => t.toLowerCase() === 'featured'),
  )

  return (
    <>
      {/* Featured slideshow */}
      {featuredVideos.length > 0 && (
        <Section sectionClassName="pb-0 md:pb-0">
          <div className="flex flex-col gap-5">
            <Heading level={2}>Featured</Heading>
            <FeaturedVideoSlideshow videos={featuredVideos} />
          </div>
        </Section>
      )}

      {/* All videos */}
      <Section>
        <div className="flex flex-col gap-8">
          <Heading level={2}>All Videos</Heading>
          {items.length > 0 ? (
            <VideoGallery videos={items} />
          ) : (
            <div className="text-center py-12 border border-dashed border-foreground/10 rounded-xl bg-background/50">
              <p className="text-foreground/50 text-sm font-medium">
                No videos match your active filter criteria.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={1}
              totalPages={totalPages}
              baseUrl="/resources/videos/page"
              searchParamsSuffix={querySuffix}
            />
          )}
        </div>
      </Section>
    </>
  )
}
