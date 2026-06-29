import { Metadata } from 'next'
import Banner from '@/components/ui/banner'

export const metadata: Metadata = {
  title: 'Awards & Recognitions',
  description: 'Honors and recognitions celebrating our work.',
  alternates: {
    canonical: '/awards-and-recognitions',
  },
}

export default function AwardsAndRecognitionsPage() {
  return (
    <>
      <Banner
        title="Awards & Recognitions"
        description="Honors and recognitions celebrating our work"
        imgUrl="/nav-item-banner-images/overview-history.webp"
      />
    </>
  )
}
