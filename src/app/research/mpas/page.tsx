import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'

export const metadata = {
  title: 'Marine Protected Areas | GDFI',
  description:
    'Marine Protected Areas established and supported across Eastern Samar to safeguard coastal biodiversity.',
}

export default function MpasPage() {
  return (
    <main className="flex-1">
      <Banner
        title="Marine Protected Areas"
        description="Marine Protected Areas established and supported across Eastern Samar to safeguard coastal biodiversity."
        imgUrl="/nav-item-banner-images/mpas.webp"
      />

      <Section>
        <></>
      </Section>
    </main>
  )
}
