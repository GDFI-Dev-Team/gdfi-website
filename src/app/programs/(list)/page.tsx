import { getPrograms } from '@/lib/data/programs'
import { SearchParams } from '@/lib/interfaces/content'
import { ProgramsGrid } from '@/features/programs/programs-grid'

export default async function ProgramsPage(searchParams: SearchParams) {
  const resolvedParams = await searchParams
  const { items, totalPages, querySuffix } = await getPrograms(
    1,
    resolvedParams,
  )

  return (
    <ProgramsGrid
      items={items}
      totalPages={totalPages}
      currentPage={1}
      querySuffix={querySuffix}
    />
  )
}
