import { Metadata } from 'next'
import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import FeaturedVideoSlideshow from '@/features/resources/video-and-media-resources/components/featured-video-slideshow'
import { getAllVideos } from '@/lib/content/videos'

export const metadata: Metadata = {
  title: 'Video & Media Resources',
  description:
    'Browse the different videos of Guiuan Development Foundation Inc.',
  openGraph: {
    title: 'Video & Media Resources',
    description:
      'Browse the different videos of Guiuan Development Foundation Inc.',
    url: '/resources/video-and-media-resources',
    images: [
      {
        url: '/nav-item-banner-images/video-and-media-resources.webp',
        width: 2048,
        height: 1536,
        alt: 'Browse the different videos of Guiuan Development Foundation Inc.',
      },
    ],
  },
  alternates: {
    canonical: '/resources/video-and-media-resources',
  },
}

export default function VideoResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const featuredVideos = getAllVideos().filter((v) => v.featured)

  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">
      <Banner
        title="Video & Media Resources"
        description="Browse the different videos of Guiuan Development Foundation Inc."
        imgUrl="/nav-item-banner-images/video-and-media-resources.webp"
      />
      <Suspense>
        <FilterBar className="justify-end gap-2">
          <SearchInput placeholder="Search videos..." />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      {featuredVideos.length > 0 && (
        <Section sectionClassName="pb-0 md:pb-0">
          <div className="flex flex-col">
            <Heading level={2} className="mb-4">
              Featured
            </Heading>
            <FeaturedVideoSlideshow videos={featuredVideos} />
          </div>
        </Section>
      )}

      <Section>{children}</Section>
    </main>
  )
}
