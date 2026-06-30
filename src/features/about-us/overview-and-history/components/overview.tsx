import Image from 'next/image'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { OVERVIEW_TEXT } from '../data/constants'

export function Overview() {
  return (
    <Section>
      {/* Intro: copy leads on the left, logo anchors the right */}
      <div className="md:flex md:items-center md:justify-between md:gap-16">
        <div>
          <Heading level={2} className="text-center md:text-left">
            Overview
          </Heading>

          <Text
            size="sm"
            className="mt-5 max-w-2xl text-center leading-relaxed text-foreground/90 whitespace-pre-line md:mt-6 md:text-left md:text-lg"
          >
            {OVERVIEW_TEXT}
          </Text>
        </div>

        {/* Logo only shows where there's room for the side-by-side layout */}
        <Image
          src="/logo-images/logo.svg"
          alt="Guiuan Development Foundation, Inc. logo"
          width={1630}
          height={1421}
          className="hidden h-48 w-auto shrink-0 md:block"
          priority
        />
      </div>
    </Section>
  )
}
