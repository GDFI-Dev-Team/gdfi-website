import type { Metadata } from 'next'
import '../styles/globals.css'
import { SiteHeader } from '@/components/layout/navbar'

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
      {/* suppressHydrationWarning: browser extensions (Grammarly, ColorZilla,
          etc.) inject attributes onto <body> after SSR, which otherwise trips
          React's hydration attribute-mismatch warning. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
