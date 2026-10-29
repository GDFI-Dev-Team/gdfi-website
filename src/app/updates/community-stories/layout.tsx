import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Community Stories',
  description:
    'Hear the voices of the coastal communities at the heart of our mission.',
  path: '/updates/community-stories',
  image: '/og/community-stories.jpg',
})

export default function CommunityStoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="flex-1">{children}</div>
}
