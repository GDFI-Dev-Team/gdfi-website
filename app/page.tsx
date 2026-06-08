import { Heading } from './components/ui/heading'
import { Text } from './components/ui/text'
import Section from './components/ui/section'

export default function Home() {
  return (
    <div>
      {/* Hero — tall so the transparent navbar overlays it before you scroll */}
      <Section className="bg-primary-50 min-h-screen flex flex-col justify-center">
        <Heading level={1}>GDFI Website Header 1.</Heading>
        <Text size="lg" className="font-bold">
          This is the text that is below Header 1. Scroll down to watch the
          navbar turn into liquid glass.
        </Text>
      </Section>

      <Section className="bg-neutral-700 text-cyan-200 min-h-screen flex flex-col justify-center">
        <Heading level={2}>GDFI Website Header 2.</Heading>
        <Text size="lg" className="mt-4">
          Keep scrolling — there is more below.
        </Text>
      </Section>

      <Section className="bg-primary-200 min-h-screen flex flex-col justify-center">
        <Heading level={2}>GDFI Website Header 3.</Heading>
        <Text size="lg" className="mt-4">
          Another full-height section to give the page room to scroll.
        </Text>
      </Section>

      <Section className="bg-accent-200 min-h-screen flex flex-col justify-center">
        <Heading level={2}>GDFI Website Header 4.</Heading>
        <Text size="lg" className="mt-4">
          You should be well past the navbar transition by now.
        </Text>
      </Section>
    </div>
  )
}
