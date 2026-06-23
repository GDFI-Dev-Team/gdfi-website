import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar from '@/components/ui/filter-bar'
import { getCollectionMarkdownData } from '@/lib/markdown'

type VideoTag = { slug: string; title: string; description?: string }

export default function VideoResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tags = getCollectionMarkdownData<VideoTag>('video_tags')
  // Exclude 'Featured' from the filterable category list — it's a display tag only
  const categories = tags
    .filter((t) => t.title.toLowerCase() !== 'featured')
    .map((t) => ({ label: t.title, value: t.title.toLowerCase() }))

  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">
      <Banner
        title="Video Resources"
        description="Browse the different videos of Guiuan Development Foundation Inc."
        imgUrl="/nav-item-banner-images/publications.webp"
      />
      <Suspense
        fallback={<div className="h-16 bg-foreground/3 animate-pulse" />}
      >
        <FilterBar categories={categories} />
      </Suspense>
      {children}
    </main>
  )
}
