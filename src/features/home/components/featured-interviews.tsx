import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'

const FeaturedInterviews = () => {
  return (
    <Section
      aria-labelledby="featured-interviews-heading"
      divClassName="flex flex-col gap-8 items-center justify-center"
    >
      <Heading id="featured-interviews-heading" level={2}>
        Featured Interviews
      </Heading>
      <div className="relative w-3/4 aspect-video overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/Uo9cOSJNQrQ"
          title="Featured interview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </Section>
  )
}

export default FeaturedInterviews
