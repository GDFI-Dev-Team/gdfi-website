import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Purpose',
  description:
    'Discover the heart of our foundation and its drive to heal our environment.',
  openGraph: {
    title: 'Our Purpose',
    description:
      'Discover the heart of our foundation and its drive to heal our environment.',
    url: '/about-us/mission-vision-and-core-values',
    images: [
      {
        url: '/nav-item-banner-images/mission-vision-and-core-values.webp',
        width: 2048,
        height: 1024,
        alt: 'Discover the heart of our foundation and its drive to heal our environment.',
      },
    ],
  },
  alternates: {
    canonical: '/about-us/mission-vision-and-core-values',
  },
}

export default function OurPurposeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1">{children}</main>
}
