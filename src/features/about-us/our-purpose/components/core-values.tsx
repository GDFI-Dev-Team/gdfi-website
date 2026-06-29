import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { CORE_VALUES } from '../data/constants'

export function CoreValues() {
  return (
    <div className="bg-foreground/[0.03]">
      <Section maxWidth="5xl" sectionClassName="py-16 md:py-24">
        <div className="flex flex-col items-center gap-12">
          <Heading level={2} className="text-center">
            Core Values
          </Heading>

          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {CORE_VALUES.map((value) => (
              <div
                key={value.label}
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
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
