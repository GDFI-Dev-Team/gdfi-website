import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar from '@/components/ui/filter-bar'

export default function AnnouncementsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">
      <Banner
        title="Announcements"
        description="Stay up to date with the latest stories, interviews, and updates from GDFI."
        imgUrl="/feat-hero/hero-1.webp"
      />
      <Suspense
        fallback={<div className="h-16 bg-foreground/3 animate-pulse" />}
      >
        <FilterBar />
      </Suspense>
      {children}
    </main>
  )
}
