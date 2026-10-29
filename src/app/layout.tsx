import type { Metadata } from 'next'
import { Montserrat, Lato } from 'next/font/google'
import '../styles/globals.css'
import { SiteHeader } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SITE_NAME, TITLE_TEMPLATE, siteUrl } from '@/lib/seo/site'
import { DEFAULT_OG_IMAGE, baseOpenGraph } from '@/lib/seo/metadata'
import { JsonLd, organizationJsonLd } from '@/lib/seo/json-ld'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
})

const HOME_TITLE = 'Guiuan Development Foundation | Coastal Conservation NGO'
const HOME_DESCRIPTION =
  'Since 1988, Guiuan Development Foundation (GDFI) has partnered with coastal communities in Eastern Samar to protect mangroves, marine protected areas and fisheries.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: TITLE_TEMPLATE,
    default: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
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
    ...baseOpenGraph,
    title: {
      template: TITLE_TEMPLATE,
      default: HOME_TITLE,
    },
    description: HOME_DESCRIPTION,
    url: '/',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'GDFI field staff conducting an underwater survey from an outrigger boat',
      },
    ],
  },
  // Card type only: Next fills twitter title/description/images from each
  // page's openGraph, so inner pages never inherit the homepage's values.
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: 'vq5UErL8UJLGVTgRD0lBwRKmayVP0h8yaj23FWkU_vA',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${lato.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions (Grammarly, ColorZilla,
          etc.) inject attributes onto <body> after SSR, which otherwise trips
          React's hydration attribute-mismatch warning. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
