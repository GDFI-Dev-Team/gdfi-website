import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { GOALS_TEXT } from '../constants'

export function Goals() {
  return (
    <div className="bg-foreground/[0.03]">
      <Section maxWidth="4xl" className="py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-6">
          <Heading level={2}>Our Goals</Heading>
          <Text size="lg" className="leading-relaxed">
            {GOALS_TEXT}
          </Text>
        </div>
      </Section>
    </div>
  )
}
