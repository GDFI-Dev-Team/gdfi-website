import { getPublications } from '@/lib/content/publications'
import PublicationResults from '@/features/resources/research-and-publications/components/pub-results'

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const { items, totalPages, querySuffix } = getPublications(1, resolvedParams)

  return (
    <PublicationResults
      publications={items}
      totalPages={totalPages}
      currentPage={1}
      querySuffix={querySuffix}
    />
  )
}
