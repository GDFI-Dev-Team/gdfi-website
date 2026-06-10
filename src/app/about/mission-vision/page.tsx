import Heading from '@/components/ui/heading'
import Section from '@/components/ui/section'
import Text from '@/components/ui/text'
import { Mission } from '@/features/about/mission-vision/components/Mission'
import { Vision } from '@/features/about/mission-vision/components/Vision'
import { CoreValues } from '@/features/about/mission-vision/components/CoreValues'
import { Goals } from '@/features/about/mission-vision/components/Goals'

export const metadata = {
  title: 'Mission, Vision & Values | GDFI',
  description:
    'Our commitment to biodiversity and sustainable development in Eastern Samar.',
}

export default function MissionVisionValuesPage() {
  return (
    <main className="flex-1 pt-24 md:pt-32">
      <Section maxWidth="5xl" className="pb-8 pt-12 md:pb-12">
        <Heading level={1} className="mb-4">
          Mission, Vision & Values
        </Heading>
        <Text size="xl" className="text-foreground/80 max-w-prose">
          Discover the driving force behind the Guiuan Development Foundation
          Inc.
        </Text>
      </Section>

      <Mission />
      <Vision />
      <Goals />
      <CoreValues />
    </main>
  )
}
