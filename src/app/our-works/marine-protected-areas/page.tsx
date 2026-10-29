import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import Banner from '@/components/ui/banner'
import MpaShowcase from '@/features/marine-protected-areas/components/mpa-showcase'

export const metadata: Metadata = buildPageMetadata({
  title: 'Marine Protected Areas (MPAs)',
  description:
    'Safeguarding marine biodiversity through community-managed Marine Protected Areas.',
  path: '/our-works/marine-protected-areas',
  image: '/og/marine-protected-areas.jpg',
})

export default function MpasPage() {
  return (
    <>
      <Banner
        title="Marine Protected Areas (MPAs)"
        description="Safeguarding marine biodiversity through community-managed Marine Protected Areas"
        imgUrl="/nav-item-banner-images/marine-protected-areas.webp"
      />
      <MpaShowcase />
    </>
  )
}
