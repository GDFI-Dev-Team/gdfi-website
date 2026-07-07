import Hero from '@/features/home/components/hero'
import OurImpact from '@/features/home/components/our-impact'
import OurCorePillars from '@/features/home/components/what-we-do'
import StoriesFromTheField from '@/features/home/components/stories-from-the-field'
import WhatsHapenning from '@/features/home/components/whats-happening'
import VoicesFromTheCoast from '@/features/home/components/voices-from-the-coast'
import Partners from '@/features/home/components/trust-badges'
import CallToAction from '@/features/home/components/call-to-action'
import { getFeaturedPrograms } from '@/features/our-works/programs-and-projects/data/programs'

export default function Home() {
  const featuredPrograms = getFeaturedPrograms(5)

  return (
    <>
      <Hero programs={featuredPrograms} />
      <OurImpact />
      <OurCorePillars />
      <StoriesFromTheField />
      <WhatsHapenning />
      <VoicesFromTheCoast />
      <Partners />
      <CallToAction />
    </>
  )
}
