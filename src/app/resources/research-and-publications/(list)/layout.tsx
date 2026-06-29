import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import YearRangeFilter from '@/components/ui/year-range-filter'
import { Suspense } from 'react'

export default function ResearchAndPublicationsListLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Banner
        title="Research & Publications"
        description="Dive into the scientific insights that anchor our conservation strategies"
        imgUrl="/nav-item-banner-images/publications.webp"
      />

      <Suspense>
        <FilterBar className="flex-nowrap justify-end gap-2">
          <SearchInput placeholder="Search publications..." />
          <YearRangeFilter />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      <Section>{children}</Section>
    </>
  )
}
