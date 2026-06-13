import {
  Overview,
  HistoryTimeline,
} from '@/features/about-us/our-story/components'
import Heading from '@/components/ui/heading'
import Section from '@/components/ui/section'
import Text from '@/components/ui/text'

export const metadata = {
  title: 'Our Story | GDFI',
  description:
    'The overview and history of the Guiuan Development Foundation Inc.',
}

export default function OurStoryPage() {
  return (
    <main className="flex-1 pt-24 md:pt-32">
      <Section maxWidth="5xl" sectionClassName="pb-4 pt-12 md:pb-8 text-center">
        <Heading level={1} className="mb-4">
          Our Story
        </Heading>
        <Text size="xl" className="text-foreground/80 max-w-2xl mx-auto">
          Decades of dedication to communities and ecosystems in Eastern Samar.
        </Text>
      </Section>

      <Overview />
      <HistoryTimeline />
    </main>
  )
}
