import { Metadata } from 'next'
import Banner from '@/components/ui/banner'

export const metadata: Metadata = {
  title: 'Marine Protected Areas (MPAs)',
  description:
    'Safeguarding marine biodiversity through community-managed Marine Protected Areas.',
  openGraph: {
    title: 'Marine Protected Areas (MPAs)',
    description:
      'Safeguarding marine biodiversity through community-managed Marine Protected Areas.',
    url: '/our-works/marine-protected-areas',
    images: [
      {
        url: '/nav-item-banner-images/marine-protected-areas.webp',
        width: 1650,
        height: 1100,
        alt: 'Marine Protected Areas (MPAs)',
      },
    ],
  },
  alternates: {
    canonical: '/our-works/marine-protected-areas',
  },
}

export default function MpasPage() {
  return (
    <>
      <Banner
        title="Marine Protected Areas (MPAs)"
        description="Safeguarding marine biodiversity through community-managed Marine Protected Areas"
        imgUrl="/nav-item-banner-images/marine-protected-areas.webp"
      />
    </>
  )
}
