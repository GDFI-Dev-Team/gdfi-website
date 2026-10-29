import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Reveal from '@/components/ui/reveal'
import Section from '@/components/ui/section'
import { CORE_VALUES } from '../data/mission-vision-and-core-values'

export function CoreValues() {
  return (
    <Section
      sectionClassName="bg-foreground/[0.03]"
      divClassName="flex flex-col items-center gap-6 md:gap-8"
    >
      <Reveal>
        <Heading level={2}>Core Values</Heading>
      </Reveal>

      <div className="grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
        {CORE_VALUES.map((value, index) => (
          <Reveal
            key={value.label}
            delay={index}
            className="flex flex-col items-center gap-4 text-center"
          >
            {/* Icon: SVG used as a mask so its color follows the theme token */}
            <span
              aria-hidden
              className="size-16 bg-foreground md:size-20"
              style={{
                maskImage: `url(${value.icon})`,
                WebkitMaskImage: `url(${value.icon})`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
              }}
            />
            <Text size="lg" className="font-semibold">
              {value.label}
            </Text>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
