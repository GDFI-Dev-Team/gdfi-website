import { Metadata } from 'next'
import Banner from '@/components/ui/banner'

export const metadata: Metadata = {
  title: 'Careers & Internships',
  description: 'Join our team — explore career and internship opportunities.',
  alternates: {
    canonical: '/get-involved/careers-and-internships',
  },
}

export default function CareersAndInternshipsPage() {
  return (
    <>
      <Banner
        title="Careers & Internships"
        description="Join our team — explore career and internship opportunities"
        imgUrl="/nav-item-banner-images/support-us.webp"
      />
    </>
  )
}
