import { Mission } from '@/features/about-us/mission-vision/components/mission'
import { Vision } from '@/features/about-us/mission-vision/components/vision'
import { CoreValues } from '@/features/about-us/mission-vision/components/core-values'
import { Goals } from '@/features/about-us/mission-vision/components/goals'
import Banner from '@/components/ui/banner'

export const metadata = {
  title: 'Mission, Vision & Values | GDFI',
  description:
    'Our commitment to biodiversity and sustainable development in Eastern Samar.',
}

export default function MissionVisionPage() {
  return (
    <main className="flex-1">
      <Banner
        title="Mission, Vision & Values"
        description="Discover the driving force behind the Guiuan Development Foundation Inc."
        imgUrl="/feat-hero/hero-3.webp"
      />

      <Mission />
      <Vision />
      <Goals />
      <CoreValues />
    </main>
  )
}
