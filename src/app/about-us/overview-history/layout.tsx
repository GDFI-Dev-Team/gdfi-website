import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Overview & History',
  description: `Trace our journey from a humble grassroots initiative in 1988 to a region-wide movement.`,
  openGraph: {
    title: 'Overview & History',
    description:
      'Trace our journey from a humble grassroots initiative in 1988 to a region-wide movement.',
    url: '/about-us/overview-history',
    images: [
      {
        url: '/nav-item-banner-images/overview-history.jpeg',
        width: 2048,
        height: 1536,
        alt: 'Trace our journey from a humble grassroots initiative in 1988 to a region-wide movement.',
      },
    ],
  },
  alternates: {
    canonical: '/about-us/overview-history',
  },
}

export default function OrganizationalStructureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1">{children}</main>
}
