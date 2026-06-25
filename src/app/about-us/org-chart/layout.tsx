import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organizational Structure',
  description: `Meet the dedicated team and leadership driving our mission forward`,
  openGraph: {
    title: 'Organizational Structure',
    description:
      'Meet the dedicated team and leadership driving our mission forward.',
    url: '/about-us/org-chart',
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
