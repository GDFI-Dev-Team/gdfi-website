import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import SelectFilter from '@/components/ui/select-filter'
import Section from '@/components/ui/section'
import { Suspense } from 'react'
import {
  getProgramStatuses,
  getProgramCategories,
} from '@/lib/content/programs'

export default function ProgramsAndProjectsListLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const statusOptions = getProgramStatuses().map((s) => ({
    label: s,
    value: s,
  }))
  const categoryOptions = getProgramCategories().map((c) => ({
    label: c,
    value: c,
  }))

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
          {categoryOptions.length > 0 && (
            <SelectFilter
              paramKey="tag"
              options={categoryOptions}
              placeholder="Filter Category"
              label="Filter by category"
              className="w-auto flex-none"
            />
          )}
          <SelectFilter
            paramKey="category"
            options={statusOptions}
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
