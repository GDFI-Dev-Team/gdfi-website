import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Button from '@/components/ui/button'

const OurLatestUpdates = () => {
  return (
    <Section
      sectionClassName="bg-foreground/3"
      aria-labelledby="our-latest-updates-heading"
      divClassName="flex flex-col gap-6 mx-auto"
    >
      <Heading
        id="our-latest-updates-heading"
        level={2}
        className="text-center"
      >
        Our Latest Updates
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="w-full h-40 bg-foreground/5"></div>
        ))}
      </div>
      <Button variant="secondary" className="self-center px-6 py-2.5">
        See more
      </Button>
    </Section>
  )
}

export default OurLatestUpdates
