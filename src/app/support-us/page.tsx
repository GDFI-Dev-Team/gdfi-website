import { Metadata } from 'next'
import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import SupportOptions from '@/features/support-us/components/support-options'

export const metadata: Metadata = {
  title: 'Support Us',
  description:
    'Help the Guiuan Development Foundation Inc. protect marine ecosystems and build sustainable coastal livelihoods through your donations.',
}

export default function SupportUsPage() {
  return (
    <main className="flex-1 flex flex-col bg-foreground/[0.02]">
      <Banner
        title="Support Our Mission"
        description="Your contribution empowers coastal communities and helps preserve the rich marine biodiversity of Eastern Samar."
        imgUrl="/feat-hero/hero-3.webp"
      />

      <Section sectionClassName="py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16 max-w-3xl mx-auto">
          <Text
            size="sm"
            transform="uppercase"
            className="tracking-widest text-accent font-semibold"
          >
            Make an impact
          </Text>
          <Heading level={2}>Every contribution makes a difference</Heading>
          <Text size="lg" className="text-foreground/70">
            Whether through financial support or in-kind contributions, your
            generosity allows us to continue our ridge-to-reef conservation
            efforts.
          </Text>
        </div>

        <SupportOptions />
      </Section>
    </main>
  )
}
