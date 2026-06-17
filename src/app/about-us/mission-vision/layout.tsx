import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission & Vision',
  description:
    'Our commitment to biodiversity and sustainable development in Eastern Samar.',
}

export default function MissionVisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1">{children}</main>
}
