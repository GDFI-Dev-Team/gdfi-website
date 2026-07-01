import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research & Publications',
  description:
    'Dive into the scientific insights that anchor our conservation strategies.',
  openGraph: {
    title: 'Research & Publications',
    description:
      'Dive into the scientific insights that anchor our conservation strategies.',
    url: '/resources/research-and-publications',
    images: [
      {
        url: '/nav-item-banner-images/research-and-publications.webp',
        width: 2048,
        height: 1024,
        alt: 'Dive into the scientific insights that anchor our conservation strategies.',
      },
    ],
  },
  alternates: {
    canonical: '/resources/research-and-publications',
  },
}

export default function ResearchAndPublicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex-1 flex flex-col bg-foreground/3"> {children} </main>
  )
}
