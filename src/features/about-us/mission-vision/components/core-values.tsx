import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { CORE_VALUES_LIST } from '../data/constants'

export function CoreValues() {
  return (
    <Section maxWidth="5xl" className="py-16 md:py-24">
      <div className="flex flex-col items-center gap-12">
        <Heading level={2} className="text-center">
          Core Values
        </Heading>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {CORE_VALUES_LIST.map((value, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-2xl border border-foreground/10 bg-background p-8 text-center shadow-sm transition-colors hover:bg-foreground/[0.02]"
            >
              <Text size="lg" className="font-semibold">
                {value}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
