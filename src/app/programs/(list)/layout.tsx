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
        description="Discover the different programs of Guiuan Development Foundation Inc. and how you can provide support."
        imgUrl="/feat-hero/hero-2.webp"
      />
      <Suspense
        fallback={<div className="h-16 bg-foreground/3 animate-pulse" />}
      >
        <FilterBar className="justify-end gap-2">
          <SearchInput placeholder="Search programs..." />
          <StatusFilter />
          <ClearFilters />
        </FilterBar>
      </Suspense>
      <Section sectionClassName="py-12 md:py-16">{children}</Section>
    </>
  )
}
