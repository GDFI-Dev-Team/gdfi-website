import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import StatusFilter from '@/features/programs/status-filter'
import Section from '@/components/ui/section'
import { Suspense } from 'react'

export default function ProgramsListLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Banner
        title="Programs"
        description="Explore how our initiatives are breathing life back to our community"
        imgUrl="/nav-item-banner-images/programs.jpeg"
      />
      <Suspense>
        <FilterBar className="justify-end gap-2">
          <SearchInput placeholder="Search programs..." />
          <StatusFilter />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      <Section>{children}</Section>
    </>
  )
}
