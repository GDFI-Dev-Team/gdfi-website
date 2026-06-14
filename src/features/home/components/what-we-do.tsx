import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import Button from '@/components/ui/button'

const programs = [
  'Coastal resource management',
  'Mariculture & livelihoods',
  'Environmental education',
]

const WhatWeDo = () => {
  return (
    <Section
      aria-labelledby="what-we-do-heading"
      sectionClassName="bg-foreground/3"
      divClassName="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mx-auto"
    >
      <div className="flex flex-col gap-6 flex-1 min-w-0 max-md:order-2">
        <div className="flex flex-col gap-4">
          <Text
            size="sm"
            transform="uppercase"
            className="tracking-widest text-accent"
          >
            What we do
          </Text>
          <Heading id="what-we-do-heading" level={2}>
            Conservation with communities at the center
          </Heading>
          <Text size="lg" className="text-foreground/70 max-w-prose">
            From community-based coastal resource management to mariculture,
            livelihood support, and environmental education — our programs put
            coastal families at the heart of conservation.
          </Text>
          <ul className="flex flex-wrap gap-2 list-none">
            {programs.map((program) => (
              <li
                key={program}
                className="rounded-full border border-foreground/15 px-4 py-1.5"
              >
                <Text size="sm" className="text-foreground/70">
                  {program}
                </Text>
              </li>
            ))}
          </ul>
        </div>
        <Button variant="secondary" className="self-start px-6 py-2.5">
          Our Impact
        </Button>
      </div>

      <div className="relative w-full md:w-1/2 shrink-0 max-md:order-1">
        {/* Offset accent backdrop */}
        <div
          className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-btn-primary/15"
          aria-hidden="true"
        />
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl shadow-lg">
          <Image
            src="/feat-hero/hero-3.webp"
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
