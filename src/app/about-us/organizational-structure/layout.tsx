import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organizational Structure',
  description:
    'Meet the dedicated team and leadership driving our mission forward',
  openGraph: {
    title: 'Organizational Structure',
    description:
      'Meet the dedicated team and leadership driving our mission forward.',
    url: '/about-us/org-chart',
    images: [
      {
        url: '/nav-item-banner-images/organizational-structure.jpeg',
        width: 2048,
        height: 1364,
        alt: 'Meet the dedicated team and leadership driving our mission forward.',
      },
    ],
  },
  alternates: {
    canonical: '/about-us/org-chart',
  },
}

export default function OrganizationalStructureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1">{children}</main>
}
