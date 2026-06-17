import type { Metadata } from 'next'
import '../styles/globals.css'
import { SiteHeader } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ),
  title: {
    template: '%s | GDFI',
    default: 'GDFI',
  },
  description: 'Official homepage of Guiuan Development Foundation Inc.',
  keywords: ['GDFI', 'Guiuan', 'Eastern Samar'],
  authors: [{ name: 'Guiuan Development Foundation Inc.' }],
  creator: 'Guiuan Development Foundation, Inc.',
  publisher: 'Guiuan Development Foundation, Inc.',
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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
