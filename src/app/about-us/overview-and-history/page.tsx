import {
  Overview,
  HistoryTimeline,
} from '@/features/about-us/overview-and-history/components'
import Banner from '@/components/ui/banner'

export default function OverviewHistoryPage() {
  return (
    <>
      <Banner
        title="Overview & History"
        description="Trace our journey from a humble grassroots initiative to a region-wide movement"
        imgUrl="/nav-item-banner-images/overview-and-history.webp"
      />

      <Overview />
      <HistoryTimeline />
    </>
  )
}
