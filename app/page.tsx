import { Heading } from './components/ui/heading'
import { Text } from './components/ui/text'
import Section from './components/ui/section'

export default function Home() {
  return (
    <div>
      <Section className="bg-accent-600">
        <Heading level={1}>GDFI Website Header 1.</Heading>
        <Text size="lg" className="font-bold">
          This is the text that is below Header 1.
        </Text>
      </Section>

      <Section className="bg-neutral-700 text-cyan-200">
        <Heading level={2}>GDFI Website Header 2.</Heading>
      </Section>
    </div>
  )
}
