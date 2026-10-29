import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Get Involved',
  description:
    'Stand with us to secure a sustainable future for our community and the environment.',
  path: '/get-involved',
  image: '/og/get-involved.jpg',
})

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col bg-foreground/3"> {children} </div>
  )
}
