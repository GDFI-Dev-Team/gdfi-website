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

export default function OurCorePillars() {
  return (
    <section className="bg-surface">
      <Section divClassName="flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-20">
        <div className="text-center md:w-1/5 md:text-right">
          <Text
            size="sm"
            transform="uppercase"
            className="mb-2 tracking-widest text-accent md:mb-3"
          >
            What we do
          </Text>
          <Heading
            level={2}
            className="text-xl leading-[1.1] md:text-3xl lg:text-4xl"
          >
            Our <br className="hidden md:inline" />
            Core <br className="hidden md:inline" />
            Pillars
          </Heading>
        </div>

        <div className="flex flex-1 flex-col gap-8 md:gap-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex items-center gap-4 md:gap-6"
            >
              <span
                aria-hidden="true"
                className="size-24 shrink-0 text-foreground sm:size-50 md:size-35 [&>svg]:block [&>svg]:size-full"
                dangerouslySetInnerHTML={{ __html: pillar.icon }}
              />
              <div className="min-w-0">
                <Heading level={4} className="text-base md:text-xl">
                  {pillar.title}
                </Heading>
                <Text className="mt-1 text-xs text-foreground/70 md:mt-2 md:text-base">
                  {pillar.desc}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </section>
  )
}
