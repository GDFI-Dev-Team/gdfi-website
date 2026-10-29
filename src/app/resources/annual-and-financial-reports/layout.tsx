import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Annual & Financial Reports',
  description:
    'Browse our tangible impacts through our yearly transparency reports.',
  path: '/resources/annual-and-financial-reports',
  image: '/og/annual-and-financial-reports.jpg',
})

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col bg-foreground/3"> {children} </div>
  )
}
