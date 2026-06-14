import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { OVERVIEW_TEXT } from '../data/constants'

export function Overview() {
  return (
    <Section maxWidth="4xl" sectionClassName="py-16 md:py-24 text-center">
      <Heading level={2} className="mb-6">
        Overview
      </Heading>
      <Text size="lg" className="leading-relaxed text-foreground/90 mx-auto">
        {OVERVIEW_TEXT}
      </Text>
    </Section>
  )
}
