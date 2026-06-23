import { Metadata } from 'next'
import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import VideoFilter from '@/features/resources/videos/components/filter'
import VideoGallery from '@/features/resources/videos/components/gallery'
import { mockVideos } from '@/features/resources/videos/data/mock'

export const metadata: Metadata = {
  title: 'Videos | Resources',
  description:
    'Watch documentaries, webinars, interviews, and tutorials from the Guiuan Development Foundation Inc.',
}

export default function VideosPage() {
  return (
    <main className="flex-1 flex flex-col bg-background">
      <Banner
        title="Videos"
        description="Explore our collection of documentaries, webinars, interviews, and field tutorials."
        imgUrl="/feat-hero/hero-2.webp"
      />

      <VideoFilter />

      <Section maxWidth="5xl" sectionClassName="py-12 md:py-16">
        {' '}
        <VideoGallery videos={mockVideos} />
      </Section>
    </main>
  )
}
