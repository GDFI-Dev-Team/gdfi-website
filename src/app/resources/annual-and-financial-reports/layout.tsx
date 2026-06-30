import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Annual & Financial Reports',
  description:
    'Browse our tangible impacts through our yearly transparency reports.',
  openGraph: {
    title: 'Annual & Financial Reports',
    description:
      'Browse our tangible impacts through our yearly transparency reports.',
    url: '/resources/annual-and-financial-reports',
    images: [
      {
        url: '/nav-item-banner-images/annual-and-financial-reports.webp',
        width: 1600,
        height: 800,
        alt: 'Browse our tangible impacts through our yearly transparency reports.',
      },
    ],
  },
  alternates: {
    canonical: '/resources/annual-and-financial-reports',
  },
}

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex-1 flex flex-col bg-foreground/3"> {children} </main>
  )
}
