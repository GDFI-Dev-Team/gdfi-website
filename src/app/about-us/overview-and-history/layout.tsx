import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Overview & History',
  description:
    'Trace our journey from a humble grassroots initiative in 1988 to a region-wide movement.',
  path: '/about-us/overview-and-history',
  image: '/og/overview-and-history.jpg',
})

export default function OrganizationalStructureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex-1">{children}</div>
}
