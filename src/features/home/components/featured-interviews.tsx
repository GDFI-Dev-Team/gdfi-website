import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import VideoCarousel from './videos-carousel'
import { getAllVideos } from '@/lib/videos'

export default function FeaturedInterviews() {
  const featuredVideos = getAllVideos().filter((v) => v.featured)
  if (featuredVideos.length === 0) return null
  return (
    <Section
      aria-labelledby="featured-interviews-heading"
      sectionClassName="bg-foreground/3 overflow-hidden"
      divClassName="flex flex-col gap-10 items-center"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Text
          size="sm"
          transform="uppercase"
          className="tracking-widest text-accent"
        >
          Voices from the coast
        </Text>
        <Heading id="featured-interviews-heading" level={2}>
          Featured Interviews
        </Heading>
      </div>

      <VideoCarousel videos={featuredVideos} />
    </Section>
  )
}
