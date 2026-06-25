import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Explore how our initiatives are breathing life back to our community.',
  openGraph: {
    title: 'Programs',
    description:
      'Explore how our initiatives are breathing life back to our community.',
    url: '/programs',
  },
  alternates: {
    canonical: '/programs',
  },
}

export default function ProgramsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">{children}</main>
  )
}
