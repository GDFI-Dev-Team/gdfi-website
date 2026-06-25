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
  description: 'The official homepage of Guiuan Development Foundation Inc.',
  applicationName: 'GDFI Website',
  keywords: [
    'GDFI',
    'Guiuan',
    'Eastern Samar',
    'Eastern Visayas',
    'Leyte',
    'Samar',
    'Biliran',
    'NGO',
  ],
  authors: [
    { name: 'Angela Denise Almazan' },
    { name: 'Norman Enrico Eulin' },
    { name: 'Adrian Raphaello Mayores' },
    { name: 'Jade Eric Petilla' },
  ],
  creator: 'Guiuan Development Foundation, Inc.',
  publisher: 'Guiuan Development Foundation, Inc.',
  category: 'Non-Government Organization',
  openGraph: {
    title: 'Guiuan Development Foundation, Inc.',
    description: 'The official homepage of Guiuan Development Foundation Inc.',
    siteName: 'GDFI',
    locale: 'en_PH',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      {/* suppressHydrationWarning: browser extensions (Grammarly, ColorZilla,
          etc.) inject attributes onto <body> after SSR, which otherwise trips
          React's hydration attribute-mismatch warning. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
