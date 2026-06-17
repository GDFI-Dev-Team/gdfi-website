import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission & Vision',
  description:
    'Our commitment to biodiversity and sustainable development in Eastern Samar.',
  openGraph: {
    title: 'Mission & Vision',
    description:
      'Our commitment to biodiversity and sustainable development in Eastern Samar.',
    url: '/about-us/mission-vision',
    images: [
      {
        url: '/feat-hero/hero-3.webp',
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
