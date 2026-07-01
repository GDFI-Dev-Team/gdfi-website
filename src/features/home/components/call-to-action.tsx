import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Link from 'next/link'
import { buttonBase } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn-merge'

export default function CallToAction() {
  return (
    <Section
      aria-labelledby="cta-heading"
      sectionClassName="bg-cta py-16 text-on-overlay md:py-24"
      maxWidth="4xl"
      divClassName="flex flex-col items-center gap-8 text-center md:gap-10"
    >
      <Heading
        id="cta-heading"
        level={2}
        className="text-balance text-on-overlay"
      >
        Join us in securing resilient coasts and empowered communities.
      </Heading>

      <div className="flex w-full flex-row gap-3 sm:w-auto sm:gap-4">
        <Link
          href="/support-us"
          className={cn(
            buttonBase,
            'flex-1 text-balance px-3 py-2.5 text-xs leading-tight text-cta bg-on-overlay shadow-sm hover:bg-on-overlay/90 active:scale-95 sm:flex-none sm:px-6 sm:py-3 sm:text-sm md:text-base',
          )}
        >
          Partner/Volunteer With Us
        </Link>
        <Link
          href="/resources/annual-and-financial-reports"
          className={cn(
            buttonBase,
            'flex-1 text-balance px-3 py-2.5 text-xs leading-tight text-on-overlay border border-on-overlay/40 hover:bg-on-overlay/10 active:scale-95 sm:flex-none sm:px-6 sm:py-3 sm:text-sm md:text-base',
          )}
        >
          View Our Reports
        </Link>
      </div>
    </Section>
  )
}
