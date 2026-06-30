import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import SelectFilter from '@/components/ui/select-filter'
import Section from '@/components/ui/section'
import { Suspense } from 'react'

const STATUS_OPTIONS = ['Completed', 'Active', 'Discontinued'].map((s) => ({
  label: s,
  value: s,
}))

export default function ProgramsAndProjectsListLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Banner
        title="Core Programs & Projects"
        description="Explore how our initiatives are breathing life back to our community"
        imgUrl="/nav-item-banner-images/programs-and-projects.webp"
      />
      <Suspense>
        <FilterBar className="flex-nowrap justify-end gap-2">
          <SearchInput placeholder="Search programs & projects..." />
          <SelectFilter
            paramKey="category"
            options={STATUS_OPTIONS}
            placeholder="Filter Status"
            label="Filter by status"
            className="w-auto flex-none"
          />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      <Section>{children}</Section>
    </>
  )
}
