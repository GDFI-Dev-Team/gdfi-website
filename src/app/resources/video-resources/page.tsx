import Heading from '@/components/ui/heading'
import Pagination from '@/components/ui/pagination'
import VideoGallery from '@/features/resources/videos/video-gallery'
import { getVideosPage } from '@/lib/videos'
import { Metadata } from 'next'
import Section from '@/components/ui/section'

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
    <Section>
      <Heading level={2} className="mb-4">
        All Videos
      </Heading>
      <div className="flex flex-col">
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
            baseUrl="/resources/video-resources/page"
            searchParamsSuffix={querySuffix}
          />
        )}
      </div>
    </Section>
  )
}
