import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import AnnualReportsShell from '@/features/resources/annual-and-financial-reports/components/ar-shell'
import FilterBar from '@/components/ui/filter-bar'
import YearRangeFilter from '@/components/ui/year-range-filter'
import { ClearFilters } from '@/components/ui/filter-bar'
import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { AnnualReport } from '@/lib/content/types'
import { Suspense } from 'react'

export default async function AnnualReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const reports = getCollectionMarkdownData<Omit<AnnualReport, 'slug'>>(
    'resources/annual-and-financial-reports',
  ).sort((a, b) => Number(b.year) - Number(a.year))

  const startYear = (resolvedParams.start_year as string) || ''
  const endYear = (resolvedParams.end_year as string) || ''

  const filtered = reports.filter((r) => {
    const year = Number(r.year)
    const start = startYear ? Number(startYear) : null
    const end = endYear ? Number(endYear) : null
    if (start !== null && year < start) return false
    if (end !== null && year > end) return false
    return true
  })

  return (
    <main className="flex-1 flex flex-col bg-foreground/3">
      <Banner
        title="Annual & Financial Reports"
        description="Browse our tangible impacts through our yearly transparency reports"
        imgUrl="/nav-item-banner-images/annual-and-financial-reports.webp"
      />

      <Suspense>
        <FilterBar className="flex-nowrap justify-end gap-2">
          <YearRangeFilter />
          <ClearFilters />
        </FilterBar>
      </Suspense>

      <Section>
        <AnnualReportsShell reports={filtered} />
      </Section>
    </main>
  )
}
