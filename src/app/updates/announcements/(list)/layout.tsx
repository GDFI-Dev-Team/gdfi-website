import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import DateFilter from '@/features/updates/announcements/components/date-filter'
import Section from '@/components/ui/section'

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
      <Suspense>
        <FilterBar className="justify-end gap-2">
          <DateFilter />
          <SearchInput placeholder="Search announcements..." />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      <Section>{children}</Section>
    </>
  )
}
