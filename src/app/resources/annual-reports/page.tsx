import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import AnnualReportsShell from '@/features/resources/annual-reports/components/ar-shell'
import FilterBar from '@/components/ui/filter-bar'
import YearRangeFilter from '@/components/ui/year-range-filter'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { AnnualReport } from '@/lib/interfaces/content'
import { Suspense } from 'react'

export default async function AnnualReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const reports = getCollectionMarkdownData<Omit<AnnualReport, 'slug'>>(
    'resources/annual-reports',
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
        title="Annual Reports"
        description="Browse our tangible impacts through our yearly transparency reports"
        imgUrl="/nav-item-banner-images/annual-reports.jpeg"
      />

      <Suspense>
        <FilterBar className="justify-end gap-2">
          <YearRangeFilter />
        </FilterBar>
      </Suspense>

      <Section>
        <AnnualReportsShell reports={filtered} />
      </Section>
    </main>
  )
}
