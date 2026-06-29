import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Purpose',
  description:
    'Discover the heart of our foundation and its drive to heal our environment.',
  openGraph: {
    title: 'Our Purpose',
    description:
      'Discover the heart of our foundation and its drive to heal our environment.',
    url: '/about-us/our-purpose',
    images: [
      {
        url: '/nav-item-banner-images/our-purpose.webp',
        width: 2048,
        height: 1024,
        alt: 'Discover the heart of our foundation and its drive to heal our environment.',
      },
    ],
  },
  alternates: {
    canonical: '/about-us/our-purpose',
  },
}

export default function OurPurposeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1">{children}</main>
}
