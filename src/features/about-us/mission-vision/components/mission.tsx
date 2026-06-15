import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
interface MissionProps {
  text: string
}
export function Mission({ text }: MissionProps) {
  return (
    <div className="bg-foreground/[0.03]">
      <Section maxWidth="4xl" sectionClassName="py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-6">
          <Heading level={2}>Our Mission</Heading>
          <Text size="lg" className="leading-relaxed max-w-prose">
            {text}
          </Text>
        </div>
      </Section>
    </div>
  )
}
