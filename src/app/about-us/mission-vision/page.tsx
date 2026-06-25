import { Mission } from '@/features/about-us/mission-vision/components/mission'
import { Vision } from '@/features/about-us/mission-vision/components/vision'
import { CoreValues } from '@/features/about-us/mission-vision/components/core-values'
import { Goals } from '@/features/about-us/mission-vision/components/goals'
import Banner from '@/components/ui/banner'

export default function MissionVisionPage() {
  return (
    <>
      <Banner
        title="Mission & Vision"
        description="Discover the heart of our foundation and its drive to heal our environment"
        imgUrl="/feat-hero/hero-3.webp"
      />
      <Mission />
      <Vision />
      <Goals />
      <CoreValues />
    </>
  )
}
