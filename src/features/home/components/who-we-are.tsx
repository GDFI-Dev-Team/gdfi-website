import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import Button from '@/components/ui/button'

const WhoWeAre = () => {
  return (
    <Section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      divClassName="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
    >
      <div className="relative w-full md:w-1/2 shrink-0">
        {/* Offset accent backdrop */}
        <div
          className="absolute -bottom-4 -left-4 h-full w-full rounded-3xl bg-accent/15"
          aria-hidden="true"
        />
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-lg">
          <Image
            src="/feat-hero/hero-2.webp"
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
          <Text
            size="sm"
            transform="uppercase"
            className="tracking-widest text-accent"
          >
            Who we are
          </Text>
          <Heading id="who-we-are-heading" level={2}>
            Rooted in Guiuan, serving coastal communities
          </Heading>
          <Text size="lg" className="text-foreground/70 max-w-prose">
            Guiuan Development Foundation, Inc. is a non-government organization
            based in Guiuan, Eastern Samar. We work alongside fishers, women,
            and local governments to care for the coastal ecosystems their
            communities depend on.
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
