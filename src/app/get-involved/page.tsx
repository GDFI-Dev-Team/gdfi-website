import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Careers from '@/features/get-involved/components/careers'
import Volunteers from '@/features/get-involved/components/volunteers'
import SupportOptions from '@/features/get-involved/components/support-options'

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

      <Section sectionClassName="py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16 max-w-3xl mx-auto">
          <Heading level={2}>Support Us</Heading>
          <Text size="lg" className="text-foreground/70">
            Whether through financial support or in-kind contributions, your
            generosity allows us to continue our ridge-to-reef conservation
            efforts.
          </Text>
        </div>

        <SupportOptions />
      </Section>
    </>
  )
}
