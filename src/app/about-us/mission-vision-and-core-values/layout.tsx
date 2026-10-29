import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Mission, Vision & Core Values',
  description:
    'Discover the heart of our foundation and its drive to heal our environment.',
  path: '/about-us/mission-vision-and-core-values',
  image: '/og/mission-vision-and-core-values.jpg',
})

export default function OurPurposeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex-1">{children}</div>
}
