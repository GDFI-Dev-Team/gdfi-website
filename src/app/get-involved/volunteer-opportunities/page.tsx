import { Metadata } from 'next'
import Banner from '@/components/ui/banner'

export const metadata: Metadata = {
  title: 'Volunteer Opportunities',
  description: 'Lend your time and skills to coastal conservation.',
  alternates: {
    canonical: '/get-involved/volunteer-opportunities',
  },
}

export default function VolunteerOpportunitiesPage() {
  return (
    <>
      <Banner
        title="Volunteer Opportunities"
        description="Lend your time and skills to coastal conservation"
        imgUrl="/nav-item-banner-images/support-us.webp"
      />
    </>
  )
}
