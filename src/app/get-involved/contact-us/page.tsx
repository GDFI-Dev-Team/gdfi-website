import { Metadata } from 'next'
import Banner from '@/components/ui/banner'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the GDFI team.',
  alternates: {
    canonical: '/get-involved/contact-us',
  },
}

export default function ContactUsPage() {
  return (
    <>
      <Banner
        title="Contact Us"
        description="Get in touch with the GDFI team"
        imgUrl="/nav-item-banner-images/support-us.webp"
      />
    </>
  )
}
