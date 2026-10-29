import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Organizational Structure',
  description:
    'Meet the dedicated team and leadership driving our mission forward.',
  path: '/about-us/organizational-structure',
  image: '/og/organizational-structure.jpg',
})

export default function OrganizationalStructureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex-1">{children}</div>
}
