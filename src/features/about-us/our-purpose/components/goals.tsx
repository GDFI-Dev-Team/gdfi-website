import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { GOALS, GOALS_OUTCOME } from '../data/constants'

export function Goals() {
  return (
    <Section maxWidth="6xl" sectionClassName="py-16 md:py-24">
      <div className="flex flex-col gap-10 md:gap-14">
        <Heading level={2} className="text-center">
          Our Goals
        </Heading>

        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-center md:gap-16">
          {/* Numbered goals, row by row */}
          <ol className="flex flex-col gap-8">
            {GOALS.map((goal) => (
              <li key={goal.number} className="flex items-start gap-5">
                <span className="font-display text-4xl font-bold leading-none text-foreground/20 md:text-5xl">
                  {goal.number}
                </span>
                <Text size="lg" className="pt-1 leading-relaxed">
                  {goal.text}
                </Text>
              </li>
            ))}
          </ol>

          {/* Highlighted outcome */}
          <div className="md:border-l md:border-foreground/10 md:pl-12">
            <Text
              size="lg"
              className="font-semibold italic leading-relaxed text-accent"
            >
              {GOALS_OUTCOME}
            </Text>
          </div>
        </div>
      </div>
    </Section>
  )
}
