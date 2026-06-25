import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission & Vision',
  description:
    'Discover the heart of our foundation and its drive to heal our environment.',
  openGraph: {
    title: 'Mission & Vision',
    description:
      'Discover the heart of our foundation and its drive to heal our environment.',
    url: '/about-us/mission-vision',
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
