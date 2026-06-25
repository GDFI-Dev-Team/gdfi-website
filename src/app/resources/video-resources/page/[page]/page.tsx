import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Pagination from '@/components/ui/pagination'
import VideoGallery from '@/features/resources/videos/video-gallery'
import { getAllVideos, getVideosPage } from '@/lib/videos'
import { paginateItems } from '@/lib/pagination'
import { CONTENT_LIMITS } from '@/config/content'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const allVideos = getAllVideos()
  const { totalPages } = paginateItems(allVideos, 1, CONTENT_LIMITS.videos)
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
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

  const { items, totalPages, maxPage, querySuffix } = getVideosPage(
    currentPage,
    resolvedParams,
  )

  if (currentPage > maxPage) notFound()

  return (
    <>
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
