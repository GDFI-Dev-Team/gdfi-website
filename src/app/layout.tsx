import type { Metadata } from 'next'
import '../styles/globals.css'
import { SiteHeader } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ),
  title: {
    template: '%s | Guiuan Development Foundation Inc.',
    default: 'Guiuan Development Foundation Inc.',
  },
  description: 'The official homepage of Guiuan Development Foundation Inc.',
  applicationName: 'Guiuan Development Foundation Inc. Website',
  creator: 'Guiuan Development Foundation, Inc.',
  publisher: 'Guiuan Development Foundation, Inc.',
  category: 'Non-Government Organization',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo-images/logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo-images/logo.svg',
  },
  openGraph: {
    title: {
      template: '%s | Guiuan Development Foundation Inc.',
      default: 'Guiuan Development Foundation Inc.',
    },
    description: 'The official homepage of Guiuan Development Foundation Inc.',
    siteName: 'Guiuan Development Foundation Inc.',
    url: '/',
    locale: 'en_PH',
    type: 'website',
    images: [
      {
        url: '/feat-hero/hero-1.jpeg',
        width: 3750,
        height: 1969,
        alt: 'The official homepage of Guiuan Development Foundation Inc.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s | Guiuan Development Foundation Inc.',
      default: 'Guiuan Development Foundation Inc.',
    },
    description: 'The official homepage of Guiuan Development Foundation Inc.',
    images: ['/feat-hero/hero-1.jpeg'],
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
