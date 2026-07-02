import { pillarsIcons } from './_bundled-icons'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

const pillars = [
  {
    icon: pillarsIcons[1],
    title: 'Coastal Resource Management',
    desc: 'Marine sanctuaries, data-driven assessments, and species restoration.',
  },
  {
    icon: pillarsIcons[2],
    title: 'Mangrove Ecosystem Protection',
    desc: 'Community-led rehabilitation, mapping, and climate resilience training.',
  },
  {
    icon: pillarsIcons[3],
    title: 'Adaptive & Inclusive Governance',
    desc: 'Strengthening local policies and building equitable partnerships.',
  },
]

export default function WhatWeDo() {
  return (
    <Section sectionClassName="bg-surface">
      <div className="mb-8 flex flex-col items-center text-center md:mb-12">
        <Text
          size="lg"
          transform="uppercase"
          className="mb-2 tracking-widest text-accent font-semibold"
        >
          What we do
        </Text>
        <Heading level={2} className="text-xl md:text-3xl lg:text-4xl">
          Our Core Pillars
        </Heading>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-10">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="group flex flex-col items-center rounded-2xl border border-border p-6 text-center transition duration-200 hover:-translate-y-1 hover:shadow-lg md:p-8"
          >
            <span
              aria-hidden="true"
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent/30 text-foreground/30 transition-colors duration-200 md:size-20 [&>svg]:block [&>svg]:size-9 md:[&>svg]:size-11"
              dangerouslySetInnerHTML={{ __html: pillar.icon }}
            />
            <div className="mt-4 min-w-0 md:mt-5">
              <Heading level={4} className="text-base md:text-xl">
                {pillar.title}
              </Heading>
              <Text className="mt-2 text-sm text-foreground/70 md:text-base">
                {pillar.desc}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
