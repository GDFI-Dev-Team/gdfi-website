import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Core Programs & Projects',
  description:
    'Explore how our initiatives are breathing life back to our community.',
  openGraph: {
    title: 'Core Programs & Projects',
    description:
      'Explore how our initiatives are breathing life back to our community.',
    url: '/our-works/programs-and-projects',
    images: [
      {
        url: '/nav-item-banner-images/programs-and-projects.webp',
        width: 1650,
        height: 1100,
        alt: 'Explore how our initiatives are breathing life back to our community.',
      },
    ],
  },
  alternates: {
    canonical: '/our-works/programs-and-projects',
  },
}

export default function ProgramsAndProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">{children}</main>
  )
}
