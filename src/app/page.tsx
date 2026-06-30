import Hero from '@/features/home/components/hero'
import OurImpact from '@/features/home/components/our-impact'
import OurCorePillars from '@/features/home/components/what-we-do'
import StoriesFromTheField from '@/features/home/components/stories-from-the-field'
import WhatsHapenning from '@/features/home/components/whats-happening'
import VoicesFromTheCoast from '@/features/home/components/voices-from-the-coast'
import Partners from '@/features/home/components/working-together'
import CallToAction from '@/features/home/components/call-to-action'
import { getRecentPrograms } from '@/lib/content/programs'

export default function Home() {
  const recentPrograms = getRecentPrograms(5)

  return (
    <>
      <Hero programs={recentPrograms} />
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
