import Image from 'next/image'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { OVERVIEW_TEXT } from '../data/constants'

export function Overview() {
  return (
    <Section maxWidth="5xl" sectionClassName="py-16 md:py-24">
      <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
        <div className="flex-1 text-center">
          <Heading level={2} className="mb-6">
            Overview
          </Heading>
          <Text
            size="lg"
            className="leading-relaxed text-foreground/90 whitespace-pre-line"
          >
            {OVERVIEW_TEXT}
          </Text>
        </div>

        <Image
          src="/logo-images/logo.svg"
          alt="Guiuan Development Foundation, Inc. logo"
          width={1630}
          height={1421}
          className="h-44 w-auto shrink-0 sm:h-52 md:h-64 lg:h-72"
          priority
        />
      </div>
    </Section>
  )
}
