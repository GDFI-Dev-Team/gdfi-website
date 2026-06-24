import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import AnnouncementFilters from '@/features/updates/announcements/components/announcement-filters'

export default function AnnouncementsListLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Banner
        title="Announcements"
        description="Stay up to date with the latest stories, interviews, and updates from GDFI."
        imgUrl="/feat-hero/hero-1.webp"
      />
      <Suspense
        fallback={<div className="h-16 bg-foreground/3 animate-pulse" />}
      >
        <FilterBar className="gap-2">
          <SearchInput placeholder="Search announcements..." />
          <AnnouncementFilters />
          <ClearFilters />
        </FilterBar>
      </Suspense>
      {children}
    </>
  )
}
