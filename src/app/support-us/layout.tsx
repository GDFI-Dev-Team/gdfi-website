import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support Us',
  description:
    'Stand with us to secure a sustainable future for our community and the environment.',
  openGraph: {
    title: 'Support Us',
    description:
      'Stand with us to secure a sustainable future for our community and the environment.',
    url: '/support-us',
    images: [
      {
        url: '/feat-hero/hero-3.jpeg',
        width: 4528,
        height: 3016,
        alt: 'Guiuan Development Foundation, Inc.',
      },
    ],
  },
  alternates: {
    canonical: '/support-us',
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
