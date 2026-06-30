'use client'

import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

export default function OurImpact() {
  const stats = [
    { value: `35+`, label: 'Years of Legacy' },
    { value: '7', label: 'Coastal Municipalities' },
    { value: '18', label: 'Hectares of Mangroves Protected' },
    { value: '25', label: 'Locally Managed MPAs' },
  ]

  return (
    <Section sectionClassName="py-12 md:py-16">
      <div className="mb-8 flex flex-col items-center text-center md:mb-12">
        <Text
          size="lg"
          transform="uppercase"
          className="mb-2 tracking-widest text-accent font-semibold"
        >
          Our Impact
        </Text>
        <Heading level={2} className="text-xl md:text-3xl lg:text-4xl">
          Conservation that adds up
        </Heading>
      </div>

      <div className="grid grid-cols-4 gap-x-2 md:gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center"
          >
            <span className="font-display text-xl font-bold leading-none text-accent sm:text-3xl md:text-6xl">
              {stat.value}
            </span>
            <Text className="mt-1.5 max-w-[14ch] text-[10px] leading-tight text-foreground/70 sm:text-sm md:mt-3 md:text-base">
              {stat.label}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  )
}
