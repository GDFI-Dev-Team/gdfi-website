import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import Section from '@/components/ui/section'

export default function VideoResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">
      <Banner
        title="Video Resources"
        description="Browse the different videos of Guiuan Development Foundation Inc."
        imgUrl="/nav-item-banner-images/publications.webp"
      />
      <Suspense>
        <FilterBar className="justify-end gap-2">
          <SearchInput placeholder="Search videos..." />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      <Section>{children}</Section>
    </main>
  )
}
