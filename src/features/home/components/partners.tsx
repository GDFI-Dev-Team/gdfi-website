import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Marquee from '@/components/ui/marquee'
import Image from 'next/image'
import Text from '@/components/ui/text'
import { partners } from '../data/partners'

const Partners = () => {
  return (
    <Section
      aria-labelledby="partners-heading"
      sectionClassName="bg-foreground/3"
      divClassName="flex flex-col gap-10"
    >
      <Heading id="partners-heading" level={2} className="text-center">
        Our Partners
      </Heading>

      <Marquee>
        {partners.map((p) => (
          <div
            key={p.name}
            className="group flex flex-col gap-2 h-50 w-40 items-center"
          >
            <div className="relative h-16 w-20 shrink-0">
              <Image
                src={`/partners/${p.file}.webp`}
                alt={p.name}
                fill
                sizes="144px"
                loading="eager"
                className="object-contain opacity-60"
              />
            </div>

            <Text
              size="sm"
              className="w-full text-center truncate cursor-default group-hover:whitespace-normal group-hover:overflow-visible"
            >
              {p.name}
            </Text>
          </div>
        ))}
      </Marquee>
    </Section>
  )
}

export default Partners
