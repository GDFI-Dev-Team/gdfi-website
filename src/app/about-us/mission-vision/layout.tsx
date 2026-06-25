import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Mission & Vision',
  },
  description:
    'Discover the heart of our foundation and its drive to heal our environment.',
  openGraph: {
    title: 'Mission & Vision',
    description:
      'Discover the heart of our foundation and its drive to heal our environment.',
    url: '/about-us/mission-vision',
    images: [
      {
        url: '/feat-hero/hero-3-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Ridge to reef campaign',
      },
    ],
  },
  alternates: {
    canonical: '/about-us/mission-vision',
  },
}

export default function MissionVisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1">{children}</main>
}
