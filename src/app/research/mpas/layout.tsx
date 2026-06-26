import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marine Protected Areas',
  description: `Witness how we create underwater sanctuaries where biodiversity can flourish.`,
  openGraph: {
    title: 'Marine Protected Areas',
    description:
      'Witness how we create underwater sanctuaries where biodiversity can flourish.',
    url: '/research/mpas',
  },
  alternates: {
    canonical: '/research/mpas',
  },
}

export default function OrganizationalStructureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1">{children}</main>
}
