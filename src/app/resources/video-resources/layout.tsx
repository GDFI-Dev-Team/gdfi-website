import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import FeaturedVideoSlideshow from '@/features/resources/videos/featured-video-slideshow'
import { getAllVideos } from '@/lib/videos'

export default function VideoResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const allVideos = getAllVideos()
  const featuredVideos = allVideos.filter((v) => v.featured)

  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">
      <Banner
        title="Video Resources"
        description="Browse the different videos of Guiuan Development Foundation Inc."
        imgUrl="/nav-item-banner-images/publications.webp"
      />
      <Suspense>
        <FilterBar className="justify-end gap-2">
          <SearchInput placeholder="Search videos..." />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      {/* Featured slideshow */}
      {featuredVideos.length > 0 && (
        <Section sectionClassName="pb-0 md:pb-0">
          <div className="flex flex-col gap-5">
            <Heading level={2}>Featured</Heading>
            <FeaturedVideoSlideshow videos={featuredVideos} />
          </div>
        </Section>
      )}

      {children}
    </main>
  )
}
