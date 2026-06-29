import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Marquee from '@/components/ui/marquee'
import Image from 'next/image'
import Text from '@/components/ui/text'
import { partners } from '../data/partners'
import { cn } from '@/lib/utils/cn-merge'

const Partners = () => {
  return (
    <Section
      aria-labelledby="partners-heading"
      divClassName="flex flex-col gap-6 w-full"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Text
          size="sm"
          transform="uppercase"
          className="tracking-widest text-accent"
        >
          Working together
        </Text>
        <Heading
          id="partners-heading"
          level={2}
          className="text-xl md:text-3xl lg:text-4xl"
        >
          Our Partners
        </Heading>
      </div>

      <Marquee>
        {partners.map((p) => {
          const containerClasses = cn(
            'cursor-pointer group flex flex-col gap-2 w-28 md:gap-4 md:w-40 items-center opacity-60 hover:opacity-100 transition-opacity duration-300 rounded-xl p-2',
            p.link,
          )
          const innerContent = (
            <>
              <div className="relative h-10 w-14 shrink-0 md:h-16 md:w-20">
                <Image
                  src={`/partners/${p.file}.webp`}
                  alt={p.name}
                  fill
                  sizes="144px"
                  unoptimized
                  className="object-contain"
                />
              </div>

              <Text
                size="xs"
                className="w-full text-center truncate cursor-default group-hover:whitespace-normal group-hover:overflow-visible"
              >
                {p.name}
              </Text>
            </>
          )
          if (p.link) {
            return (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${p.name} website`}
                className={containerClasses}
              >
                {innerContent}
              </a>
            )
          }
          return (
            <div key={p.name} className={containerClasses}>
              {innerContent}
            </div>
          )
        })}
      </Marquee>
    </Section>
  )
}

export default Partners
