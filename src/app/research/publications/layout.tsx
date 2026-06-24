import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Research, studies, and findings from our work across the ridge-to-reef ecosystems of Eastern Samar.',
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
