import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import Button from '@/components/ui/button'

const WhoWeAre = () => {
  return (
    <Section
      aria-labelledby="who-we-are-heading"
      divClassName="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mx-auto"
    >
      <div className="w-full md:w-1/2 shrink-0">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/feat-hero/hero-1.webp"
            alt=""
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1 min-w-0">
        <div className="flex flex-col gap-4">
          <Heading id="who-we-are-heading" level={2}>
            Who We Are
          </Heading>
          <Text size="lg" className="text-foreground/70 max-w-prose">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since 1966.
          </Text>
        </div>
        <Button variant="secondary" className="self-start px-6 py-2.5">
          Our Story
        </Button>
      </div>
    </Section>
  )
}

export default WhoWeAre
