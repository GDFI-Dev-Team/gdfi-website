import Heading from '@/components/ui/heading'
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
      <Heading level={2} className="mb-4">
        All Videos
      </Heading>
      <VideoGallery
        videos={items}
        totalPages={totalPages}
        currentPage={currentPage}
        querySuffix={querySuffix}
      />
    </>
  )
}
