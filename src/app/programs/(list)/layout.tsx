import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar, { SearchInput } from '@/components/ui/filter-bar'
import StatusFilter from '@/features/programs/status-filter'

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
        <FilterBar>
          <SearchInput placeholder="Search programs..." />
          <StatusFilter />
        </FilterBar>
      </Suspense>
      {children}
    </>
  )
}
