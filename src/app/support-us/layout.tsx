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
        url: '/nav-item-banner-images/support-us.webp',
        width: 1280,
        height: 854,
        alt: 'Stand with us to secure a sustainable future for our community and the environment.',
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
