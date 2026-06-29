import { Suspense } from 'react'
import Banner from '@/components/ui/banner'
import FilterBar, {
  SearchInput,
  ClearFilters,
} from '@/components/ui/filter-bar'
import SelectFilter from '@/components/ui/select-filter'
import Section from '@/components/ui/section'
import { getCommunityCategories } from '@/lib/content/community-categories'

export default function CommunityStoriesListLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categoryOptions = getCommunityCategories().map((name) => ({
    label: name,
    value: name,
  }))

  return (
    <>
      <Banner
        title="Community Stories"
        description="Hear the voices of the coastal communities at the heart of our mission"
        imgUrl="/nav-item-banner-images/community-stories.webp"
      />
      <Suspense>
        <FilterBar className="justify-end gap-2">
          <SearchInput placeholder="Search community stories..." />
          {categoryOptions.length > 0 && (
            <SelectFilter
              paramKey="category"
              options={categoryOptions}
              placeholder="Filter Category"
              label="Filter by category"
            />
          )}
          <ClearFilters />
        </FilterBar>
      </Suspense>

      <Section>{children}</Section>
    </>
  )
}
