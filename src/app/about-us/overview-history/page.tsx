import { Overview, HistoryTimeline } from '@/features/about-us/components'
import Banner from '@/components/ui/banner'

export default function OverviewHistoryPage() {
  return (
    <main className="flex-1">
      <Banner
        title="Overview & History"
        description="Trace our journey from a humble grassroots initiative to a region-wide movement"
        imgUrl="/feat-hero/hero-1.webp"
      />

      <Overview />
      <HistoryTimeline />
    </main>
  )
}
