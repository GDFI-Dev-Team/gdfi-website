import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Dive into the scientific insights that anchor our conservation strategies.',
  openGraph: {
    title: 'Publications',
    description:
      'Dive into the scientific insights that anchor our conservation strategies.',
    url: '/research/publications',
    images: [
      {
        url: '/nav-item-banner-images/publications.jpeg',
        width: 2048,
        height: 1024,
        alt: 'Guiuan Development Foundation, Inc.',
      },
    ],
  },
  alternates: {
    canonical: '/research/publications',
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
