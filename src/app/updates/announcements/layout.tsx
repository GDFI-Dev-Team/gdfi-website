import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Announcements',
  description: 'Stay connected with our ongoing efforts on the frontlines.',
  openGraph: {
    title: 'Announcements',
    description: 'Stay connected with our ongoing efforts on the frontlines.',
    url: '/updates/announcements',
    images: [
      {
        url: '/nav-item-banner-images/announcements.jpeg',
        width: 2048,
        height: 1365,
        alt: 'Stay connected with our ongoing efforts on the frontlines.',
      },
    ],
  },
  alternates: {
    canonical: '/updates/announcements',
  },
}

export default function AnnouncementsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">{children}</main>
  )
}
