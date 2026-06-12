import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

const FeaturedInterviews = () => {
  return (
    <Section
      aria-labelledby="featured-interviews-heading"
      sectionClassName="bg-foreground/3"
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

      <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-3xl shadow-lg">
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
