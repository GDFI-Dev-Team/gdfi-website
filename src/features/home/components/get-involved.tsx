import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { Handshake, Package, MicVocal, type LucideIcon } from 'lucide-react'

const cards: { Icon: LucideIcon; label: string; description: string }[] = [
  {
    Icon: Handshake,
    label: 'Be a partner',
    description:
      'Collaborate with us to expand our reach and deepen our impact.',
  },
  {
    Icon: Package,
    label: 'Make a donation',
    description: 'Support our programs and help communities thrive.',
  },
  {
    Icon: MicVocal,
    label: 'Advocate with us',
    description: 'Amplify our mission and raise awareness for lasting change.',
  },
]

const GetInvolved = () => {
  return (
    <Section
      aria-labelledby="get-involved-heading"
      divClassName="flex flex-col gap-10"
      sectionClassName="bg-foreground/3"
    >
      <Heading id="get-involved-heading" level={2} className="text-center">
        Get Involved
      </Heading>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map(({ Icon, label, description }) => (
          <div
            key={label}
            className="bg-background rounded-2xl p-8 flex flex-col items-center gap-4 text-center shadow-sm"
          >
            <div className="bg-btn-primary/10 p-5 rounded-full">
              <Icon
                size={36}
                className="text-btn-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Heading level={3}>{label}</Heading>
              <Text className="text-foreground/60">{description}</Text>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default GetInvolved
