import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Pagination from '@/components/ui/pagination'
import VideoGrid from '@/features/resources/videos/video-grid'
import VideoSlideshow from '@/features/resources/videos/featured-video-slideshow'
import { getAllVideos, getVideosPage } from '@/lib/videos'
import { paginateItems } from '@/lib/pagination'
import { CONTENT_LIMITS } from '@/config/content'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const allVideos = getAllVideos()
  const { totalPages } = paginateItems(allVideos, 1, CONTENT_LIMITS.videos)
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export const metadata: Metadata = {
  title: 'Video Resources',
  description: 'Browse all videos from Guiuan Development Foundation Inc.',
}

interface PageProps {
  params: Promise<{ page: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VideoResourcesPaginatedPage({
  params,
  searchParams,
}: PageProps) {
  const [{ page }, resolvedParams] = await Promise.all([params, searchParams])

  const currentPage = Number(page)
  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const allVideos = getAllVideos()
  const { items, totalPages, maxPage, querySuffix } = getVideosPage(
    currentPage,
    resolvedParams,
  )

  if (currentPage > maxPage) notFound()

  const featuredVideos = allVideos.filter((v) =>
    v.tags?.some((t) => t.toLowerCase() === 'featured'),
  )

  return (
    <>
      {/* Featured slideshow — shown on every page for discoverability */}
      {featuredVideos.length > 0 && (
        <Section sectionClassName="pb-0 md:pb-0">
          <div className="flex flex-col gap-5">
            <Heading level={2}>Featured</Heading>
            <VideoSlideshow videos={featuredVideos} />
          </div>
        </Section>
      )}

      <Section>
        <div className="flex flex-col gap-8">
          <Heading level={2}>All Videos</Heading>
          {items.length > 0 ? (
            <VideoGrid videos={items} />
          ) : (
            <div className="text-center py-12 border border-dashed border-foreground/10 rounded-xl bg-background/50">
              <p className="text-foreground/50 text-sm font-medium">
                No videos match your active filter criteria.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/resources/video-resources/page"
              searchParamsSuffix={querySuffix}
            />
          )}
        </div>
      </Section>
    </>
  )
}
