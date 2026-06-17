import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organizational Structure',
  description:
    'Meet the board of trustees, project coordinators, and volunteers dedicated to the Guiuan Development Foundation Inc.',
}

export default function OrganizationalStructureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex-1">{children}</main>
}
