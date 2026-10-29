import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Research & Publications',
  description:
    'Dive into the scientific insights that anchor our conservation strategies.',
  path: '/resources/research-and-publications',
  image: '/og/research-and-publications.jpg',
})

export default function ResearchAndPublicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col bg-foreground/3"> {children} </div>
  )
}
