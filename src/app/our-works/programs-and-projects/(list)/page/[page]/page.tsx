import { notFound } from 'next/navigation'
import { getPrograms } from '@/lib/content/programs'
import { PageProps } from '@/lib/content/types'
import { ProgramsGrid } from '@/features/our-works/programs-and-projects/components/programs-grid'

export async function generateStaticParams() {
  const { maxPage } = await getPrograms(1, {})
  return Array.from({ length: maxPage }, (_, i) => ({ page: String(i + 1) }))
}

export default async function ProgramsPageRoute({
  params,
  searchParams,
}: PageProps) {
  const [{ page }, resolvedParams] = await Promise.all([params, searchParams])

  const currentPage = Number(page)
  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const { items, totalPages, maxPage, querySuffix } = await getPrograms(
    currentPage,
    resolvedParams,
  )
  if (currentPage > maxPage) notFound()

  return (
    <ProgramsGrid
      items={items}
      totalPages={totalPages}
      currentPage={currentPage}
      querySuffix={querySuffix}
    />
  )
}
