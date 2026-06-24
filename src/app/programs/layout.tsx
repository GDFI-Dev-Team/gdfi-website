import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Discover the different programs of Guiuan Development Foundation Inc. and how you can provide support.',
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
