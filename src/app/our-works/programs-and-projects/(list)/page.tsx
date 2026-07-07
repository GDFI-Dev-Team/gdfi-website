import { getPrograms } from '@/features/our-works/programs-and-projects/data/programs'
import { ProgramsGrid } from '@/features/our-works/programs-and-projects/components/programs-grid'

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
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
