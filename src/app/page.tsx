import type { Metadata } from 'next'
import { Hero } from '../features/home/components/hero'
import WhoWeAre from '@/features/home/components/who-we-are'
import Stories from '@/features/home/components/stories'
import OurLatestUpdates from '@/features/home/components/our-latest-updates'
import FeaturedVideos from '@/features/home/components/featured-videos'
import Partners from '@/features/home/components/partners'

export const metadata: Metadata = {
  title: {
    absolute: 'Guiuan Development Foundation, Inc.',
  },
  description: '<Some text here>',
}

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Stories />
      <OurLatestUpdates />
      <FeaturedVideos />
      <Partners />
    </>
  )
}
