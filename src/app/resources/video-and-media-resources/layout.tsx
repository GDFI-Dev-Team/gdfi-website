import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Reveal from '@/components/ui/reveal'
import FeaturedVideoSlideshow from '@/features/resources/video-and-media-resources/components/featured-video-slideshow'
import { getAllVideos } from '@/features/resources/video-and-media-resources/data/videos'

export const metadata: Metadata = buildPageMetadata({
  title: 'Video & Media Resources',
  description:
    'Browse the different videos of Guiuan Development Foundation Inc.',
  path: '/resources/video-and-media-resources',
  image: '/og/video-and-media-resources.jpg',
})

export default function VideoResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const featuredVideos = getAllVideos().filter((v) => v.featured)

  return (
    <div className="flex-1 flex flex-col bg-foreground/0.02">
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
          <Reveal className="flex flex-col">
            <Heading level={2} className="mb-4">
              Featured
            </Heading>
            <FeaturedVideoSlideshow videos={featuredVideos} />
          </Reveal>
        </Section>
      )}

      <Section>{children}</Section>
    </div>
  )
}
