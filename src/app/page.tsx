import { Hero } from '@/features/home/components/hero'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

// Sample homepage sections — placeholder content to lay out and adjust.
// Every section uses `px-[var(--gutter)]` so its text lines up with the
// navbar logo and hero. Adjust the gutter in ONE place — src/styles/globals.css:
//   • mobile  → the `--gutter` value in :root
//   • desktop → the `--gutter` override inside the `@media (min-width: 768px)`
const sampleSections = [
  {
    title: 'Featured Prorgam',
    body: 'Placeholder copy.',
  },
  {
    title: 'Who Are We',
    body: 'Placeholder copy.',
  },
  {
    title: 'What We Do',
    body: 'Placeholder copy.',
  },
  {
    title: 'Our Latest Updates',
    body: 'Placeholder copy.',
  },
  {
    title: 'Get Involved',
    body: 'Placeholder copy.',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      {sampleSections.map((section, i) => (
        <section
          key={section.title}
          // px-[var(--gutter)] = the shared side padding (mobile/desktop set in
          // globals.css). py-* here is just vertical rhythm — tune freely.
          className={`px-[var(--gutter)] py-16 md:py-24 ${
            i % 2 === 1 ? 'bg-foreground/[0.03]' : ''
          }`}
        >
          <Heading level={2}>{section.title}</Heading>
          <Text size="lg" className="mt-4 max-w-prose">
            {section.body}
          </Text>
        </section>
      ))}
    </>
  )
}
