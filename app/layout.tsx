import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'GDFI',
  description: 'Official homepage of Guiuan Development Foundation Inc.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
