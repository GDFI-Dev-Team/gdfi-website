import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Core Programs & Projects',
  description:
    'Explore how our initiatives are breathing life back to our community.',
  path: '/our-works/programs-and-projects',
  image: '/og/programs-and-projects.jpg',
})

export default function ProgramsAndProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex-1 flex flex-col bg-foreground/0.02">{children}</div>
  )
}
