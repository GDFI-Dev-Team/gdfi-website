import type { Metadata } from 'next'
import { Hero } from '../features/home/components/hero'
import OurImpact from '@/features/home/components/our-impact'
import OurCorePillars from '@/features/home/components/our-core-pillars'
import Stories from '@/features/home/components/stories'
import OurLatestUpdates from '@/features/home/components/our-latest-updates'
import FeaturedInterviews from '@/features/home/components/featured-interviews'
import Partners from '@/features/home/components/partners'
import CallToAction from '@/features/home/components/call-to-action'
import { getRecentPrograms } from '@/lib/content/programs'

export const metadata: Metadata = {
  title: {
    absolute: 'Guiuan Development Foundation, Inc.',
  },
  description: '<Some text here>',
}

export default function Home() {
  const recentPrograms = getRecentPrograms(5)

  return (
    <>
      <Hero programs={recentPrograms} />
      <OurImpact />
      <OurCorePillars />
      <Stories />
      <OurLatestUpdates />
      <FeaturedInterviews />
      <Partners />
      <CallToAction />
    </>
  )
}
