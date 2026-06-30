import Image from 'next/image'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import {
  OVERVIEW_TEXT,
  OVERVIEW_STATS,
} from '../overview-history/data/constants'

export function Overview() {
  return (
    <>
      <Section maxWidth="6xl" sectionClassName="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:items-start md:gap-16">
          {/* Narrative */}
          <div className="md:text-right">
            <Heading level={2} className="mb-6 text-center md:text-right">
              Overview
            </Heading>

            {/* On mobile the copy is a fixed-height scroll area with fade hints
                top + bottom; at md it expands fully (no scroll, no fades). */}
            <div className="relative">
              <div className="max-h-64 overflow-y-auto py-6 md:max-h-none md:overflow-visible md:py-0 md:pr-0">
                <Text
                  size="sm"
                  className="leading-relaxed text-foreground/90 whitespace-pre-line md:text-lg"
                >
                  {OVERVIEW_TEXT}
                </Text>
              </div>

              {/* Fade hints (mobile only) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-background to-transparent md:hidden" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-background to-transparent md:hidden" />
            </div>
          </div>

          {/* Identity rail: logo + founding stats.
              Mobile: row (small logo left, stats right). md: centered column. */}
          <div className="flex flex-row items-center justify-between gap-6 md:flex-col md:items-start md:justify-normal md:gap-8 md:self-center">
            <Image
              src="/logo-images/logo.svg"
              alt="Guiuan Development Foundation, Inc. logo"
              width={1630}
              height={1421}
              className="h-24 w-auto shrink-0 md:h-56"
              priority
            />

            <div className="flex flex-col gap-4 md:gap-6 md:border-t md:border-foreground/10 md:pt-6">
              {OVERVIEW_STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-4">
                  <span className="font-display text-xl font-bold leading-none text-accent md:text-5xl">
                    {stat.value}
                  </span>
                  <Text size="xs" className="leading-tight text-foreground/70">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Full-bleed landscape photo — sits outside the Section so it ignores
          the gutter + max-width and spans edge to edge */}
      <div className="relative h-25 w-full overflow-hidden md:h-80">
        <Image
          src="/about-us/overview-history/overview.webp"
          alt="Guiuan Development Foundation's coastal conservation work in Eastern Samar"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </>
  )
}
