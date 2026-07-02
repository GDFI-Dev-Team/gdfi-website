import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Marquee from '@/components/ui/marquee'
import Image from 'next/image'
import Text from '@/components/ui/text'
import { partners, awards } from '../data/badges'
import { cn } from '@/lib/utils/cn-merge'

export default function TrustBadges() {
  const allBadges = [
    ...awards.map((award) => ({ ...award, type: 'award' as const })),
    ...partners.map((partner) => ({ ...partner, type: 'partner' as const })),
  ]

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
        {allBadges.map((badge, index) => {
          const key = `${badge.type}-${badge.name}-${index}`
          const isAward = badge.type === 'award'
          const link = 'link' in badge ? badge.link : undefined

          const containerClasses = cn(
            'group flex flex-col gap-2 w-28 md:gap-4 md:w-40 items-center opacity-60 hover:opacity-100 transition-opacity duration-300 rounded-xl p-2',
            link ? 'cursor-pointer' : 'cursor-default',
          )

          const innerContent = (
            <>
              <div className="relative h-10 w-14 shrink-0 md:h-16 md:w-20">
                <Image
                  src={`/badges/${badge.file}.webp`}
                  alt={badge.name}
                  fill
                  sizes="144px"
                  unoptimized
                  className={cn(
                    'object-contain',
                    isAward && 'scale-110 drop-shadow-sm',
                  )}
                />
              </div>

              <Text
                size="xs"
                className="w-full text-center truncate group-hover:whitespace-normal group-hover:overflow-visible"
              >
                {badge.name}
              </Text>
            </>
          )

          if (link) {
            return (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${badge.name} website`}
                className={containerClasses}
              >
                {innerContent}
              </a>
            )
          }

          return (
            <div key={key} className={containerClasses}>
              {innerContent}
            </div>
          )
        })}
      </Marquee>
    </Section>
  )
}
