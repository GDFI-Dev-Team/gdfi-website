import { MissionVisionCoreValues } from '@/features/about-us/mission-vision-and-core-values/components/mission-vision'
import { CoreValues } from '@/features/about-us/mission-vision-and-core-values/components/core-values'
import { Goals } from '@/features/about-us/mission-vision-and-core-values/components/goals'
import Banner from '@/components/ui/banner'

export default function OurPurposePage() {
  return (
    <>
      <Banner
        title="Mission, Vision & Core Values"
        description="Discover the heart of our foundation and its drive to heal our environment"
        imgUrl="/nav-item-banner-images/mission-vision-and-core-values.webp"
      />
      <MissionVisionCoreValues />
      <Goals />
      <CoreValues />
    </>
  )
}
