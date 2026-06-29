import type { Metadata } from 'next'
import { Hero } from '../features/home/components/hero'
import StatPage from '@/features/home/components/stat-page'
import OurCorePillars from '@/features/home/components/our-core-pillars'
import WhoWeAre from '@/features/home/components/who-we-are'
import Stories from '@/features/home/components/stories'
import OurLatestUpdates from '@/features/home/components/our-latest-updates'
import FeaturedInterviews from '@/features/home/components/featured-interviews'
import Partners from '@/features/home/components/partners'
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
      <StatPage />
      <OurCorePillars />
      <WhoWeAre />
      <Stories />
      <OurLatestUpdates />
      <FeaturedInterviews />
      <Partners />
    </>
  )
}
