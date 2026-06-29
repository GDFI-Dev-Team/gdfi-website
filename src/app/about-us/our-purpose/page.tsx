import { MissionVision } from '@/features/about-us/our-purpose/components/mission-vision'
import { CoreValues } from '@/features/about-us/our-purpose/components/core-values'
import { Goals } from '@/features/about-us/our-purpose/components/goals'
import Banner from '@/components/ui/banner'

export default function OurPurposePage() {
  return (
    <>
      <Banner
        title="Our Purpose"
        description="Discover the heart of our foundation and its drive to heal our environment"
        imgUrl="/nav-item-banner-images/our-purpose.webp"
      />
      <MissionVision />
      <Goals />
      <CoreValues />
    </>
  )
}
