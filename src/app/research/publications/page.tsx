import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'

export const metadata = {
  title: 'Publications | GDFI',
  description:
    'Research, studies, and findings from our work across the ridge-to-reef ecosystems of Eastern Samar.',
}

export default function PublicationsPage() {
  return (
    <main className="flex-1">
      <Banner
        title="Publications"
        description="Research, studies, and findings from our work across the ridge-to-reef ecosystems of Eastern Samar."
        imgUrl="/nav-item-banner-images/publications.webp"
      />

      <Section>
        <></>
      </Section>
    </main>
  )
}
