import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Marquee from '@/components/ui/marquee'
import Text from '@/components/ui/text'
import BadgeCard from './badge-card'
import { getBadges } from '@/lib/content/badges'

export default function TrustBadges() {
  const badges = getBadges()

  return (
    <Section
      aria-labelledby="trust-badges-heading"
      divClassName="flex flex-col gap-6 w-full"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Text
          size="lg"
          transform="uppercase"
          className="tracking-widest text-accent font-semibold"
        >
          Recognitions & Partnerships
        </Text>
        <Heading
          id="trust-badges-heading"
          level={2}
          className="text-xl md:text-3xl lg:text-4xl"
        >
          Trust Badges
        </Heading>
      </div>

      <Marquee>
        {badges.map((badge, index) => (
          <BadgeCard
            key={`${badge.type}-${badge.name}-${index}`}
            badge={badge}
          />
        ))}
      </Marquee>
    </Section>
  )
}
