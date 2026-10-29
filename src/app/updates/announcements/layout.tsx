import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Announcements',
  description: 'Stay connected with our ongoing efforts on the frontlines.',
  path: '/updates/announcements',
  image: '/og/announcements.jpg',
})

export default function AnnouncementsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex-1 flex flex-col bg-foreground/0.02">{children}</div>
  )
}
