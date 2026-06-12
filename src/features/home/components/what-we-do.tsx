import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import Button from '@/components/ui/button'

const WhatWeDo = () => {
  return (
    <Section
      aria-labelledby="our-impact-heading"
      sectionClassName="bg-foreground/3"
      divClassName="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mx-auto"
    >
      <div className="flex flex-col gap-6 flex-1 min-w-0 max-md:order-2">
        <div className="flex flex-col gap-4">
          <Heading id="our-impact-heading" level={2}>
            What We Do
          </Heading>
          <Text size="lg" className="text-foreground/70 max-w-prose">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since 1966.
          </Text>
        </div>
        <Button variant="secondary" className="self-start px-6 py-2.5">
          Our Impact
        </Button>
      </div>

      <div className="w-full md:w-1/2 shrink-0 max-md:order-1">
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
    </Section>
  )
}

export default WhatWeDo
