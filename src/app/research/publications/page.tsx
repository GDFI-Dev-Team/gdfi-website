import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import PublicationList from '@/features/research/publications/components/pub-list'
import FilterBar from '@/components/ui/filter-bar'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { Publication } from '@/lib/interfaces/content'
import { SearchInput, ClearFilters } from '@/components/ui/filter-bar'
import { Suspense } from 'react'
import YearRangeFilter from '@/components/ui/year-range-filter'

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const publications = getCollectionMarkdownData<Omit<Publication, 'slug'>>(
    'research/publications',
  ).sort((a, b) => Number(b.year) - Number(a.year))

  const q = (resolvedParams.q as string) || ''
  const startYear = (resolvedParams.start_year as string) || ''
  const endYear = (resolvedParams.end_year as string) || ''

  const filtered = publications.filter((p) => {
    const query = q.trim().toLowerCase()
    const year = Number(p.year)
    const start = startYear ? Number(startYear) : null
    const end = endYear ? Number(endYear) : null

    if (start !== null && year < start) return false
    if (end !== null && year > end) return false
    if (!query) return true
    return (
      p.title.toLowerCase().includes(query) ||
      p.authors.toLowerCase().includes(query) ||
      (p.outlet?.toLowerCase().includes(query) ?? false)
    )
  })

  return (
    <>
      <Banner
        title="Publications"
        description="Dive into the scientific insights that anchor our conservation strategies"
        imgUrl="/nav-item-banner-images/publications.webp"
      />

      <Suspense>
        <FilterBar className="justify-end gap-2">
          <SearchInput placeholder="Search publications..." />
          <YearRangeFilter />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      <Section sectionClassName="py-12 md:py-16">
        <PublicationList publications={filtered} />
      </Section>
    </>
  )
}
