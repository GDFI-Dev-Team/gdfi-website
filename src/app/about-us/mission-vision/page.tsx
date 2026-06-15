import { Mission } from '@/features/about-us/mission-vision/components/mission'
import { Vision } from '@/features/about-us/mission-vision/components/vision'
import { CoreValues } from '@/features/about-us/mission-vision/components/core-values'
import { Goals } from '@/features/about-us/mission-vision/components/goals'
import { getSingleMarkdownData } from '@/lib/markdown'
import { MissionVision } from '@/lib/interfaces/MissionVision'
import Banner from '@/components/ui/banner'

export const metadata = {
  title: 'Mission, Vision & Values | GDFI',
  description:
    'Our commitment to biodiversity and sustainable development in Eastern Samar.',
}

export default function MissionVisionPage() {
  const data = getSingleMarkdownData<MissionVision>(
    'pages',
    'mission-vision.md',
  )
  return (
    <main className="flex-1">
      <Banner
        title="Mission, Vision & Values"
        description={data.description}
        imgUrl="/feat-hero/hero-3.webp"
      />
      <Mission text={data.mission} />
      <Vision text={data.vision} />
      <Goals text={data.goals} />
      <CoreValues core_values={data.core_values} />
    </main>
  )
}
