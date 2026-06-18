import { Metadata } from 'next'
import Banner from '@/components/ui/banner'
import NewsFilterBar from '@/features/news/components/filter-bar'

export const metadata: Metadata = {
  title: 'News & Updates',
  description:
    'Stay up to date with the latest stories, interviews, and updates from the Guiuan Development Foundation Inc.',
}

export default function NewsPage() {
  return (
    <main className="flex-1 flex flex-col bg-foreground/[0.02]">
      <Banner
        title="News"
        description="Stay up to date with the latest stories, interviews, and updates from GDFI."
        imgUrl="/feat-hero/hero-1.webp"
      />

      <NewsFilterBar />
    </main>
  )
}
