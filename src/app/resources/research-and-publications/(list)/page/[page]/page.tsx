import { notFound } from 'next/navigation'
import { getPublications } from '@/lib/content/publications'
import { PageProps } from '@/lib/content/types'
import PublicationResults from '@/features/resources/research-and-publications/components/pub-results'

export function generateStaticParams() {
  const { maxPage } = getPublications(1, {})
  return Array.from({ length: maxPage }, (_, i) => ({ page: String(i + 1) }))
}

export default async function PublicationsPageRoute({
  params,
  searchParams,
}: PageProps) {
  const [{ page }, resolvedParams] = await Promise.all([params, searchParams])

  const currentPage = Number(page)
  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const { items, totalPages, maxPage, querySuffix } = getPublications(
    currentPage,
    resolvedParams,
  )
  if (currentPage > maxPage) notFound()

  return (
    <PublicationResults
      publications={items}
      totalPages={totalPages}
      currentPage={currentPage}
      querySuffix={querySuffix}
    />
  )
}
