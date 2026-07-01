import Banner from '@/components/ui/banner'
import Careers from '@/features/get-involved/components/careers'
import Volunteers from '@/features/get-involved/components/volunteers'
import SupportOptions from '@/features/get-involved/components/support-us'

export default function GetInvolvedPage() {
  return (
    <>
      <Banner
        title="Get Involved"
        description="Join our journey to protect and restore the marine heritage of Eastern Visayas"
        imgUrl="/nav-item-banner-images/support-us.webp"
      />

      <Careers />
      <Volunteers />
      <SupportOptions />
    </>
  )
}
