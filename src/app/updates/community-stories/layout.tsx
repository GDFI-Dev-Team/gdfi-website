import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Stories',
  description:
    'Hear the voices of the coastal communities at the heart of our mission',
  openGraph: {
    title: 'Community Stories',
    description:
      'Hear the voices of the coastal communities at the heart of our mission',
    url: '/updates/community-stories',
    images: [
      {
        url: '/nav-item-banner-images/community-stories.jpeg',
        width: 2048,
        height: 1536,
        alt: 'Hear the voices of the coastal communities at the heart of our mission.',
      },
    ],
  },
  alternates: {
    canonical: '/updates/community-stories',
  },
}

export default function CommunityStoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="flex-1">{children}</main>
}
