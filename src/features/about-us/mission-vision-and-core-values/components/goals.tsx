import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { GOALS } from '../data/constants'

export function Goals() {
  return (
    <Section divClassName="flex flex-col items-center gap-6 md:gap-8">
      <Heading level={2}>Our Goals</Heading>
      {/* One card per goal — three goals map cleanly to a 3-up grid on desktop */}
      <ol className="grid w-full gap-6 md:grid-cols-3 md:gap-8">
        {GOALS.map((goal) => (
          <li
            key={goal.number}
            className="flex flex-col gap-4 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="font-display text-5xl font-bold leading-none text-foreground/30">
              {goal.number}
            </span>
            <Text size="lg" className="leading-relaxed text-foreground/80">
              {goal.text}
            </Text>
          </li>
        ))}
      </ol>
    </Section>
  )
}
