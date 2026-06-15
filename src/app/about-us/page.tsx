import { Overview, HistoryTimeline } from '@/features/about-us/components'
import Banner from '@/components/ui/banner'

export const metadata = {
  title: 'About Us | GDFI',
  description:
    'The overview and history of the Guiuan Development Foundation Inc.',
}

export default function OurStoryPage() {
  return (
    <main className="flex-1">
      <Banner
        title="About Us"
        description="Decades of dedication to communities and ecosystems in Eastern Samar."
        imgUrl="/feat-hero/hero-1.webp"
      />

      <Overview />
      <HistoryTimeline />
    </main>
  )
}
