import PublicationList from './pub-list'
import Pagination from '@/components/ui/pagination'
import { Publication } from '@/lib/interfaces/content'

interface PublicationResultsProps {
  publications: Publication[]
  totalPages: number
  currentPage: number
  querySuffix: string
}

export default function PublicationResults({
  publications,
  totalPages,
  currentPage,
  querySuffix,
}: PublicationResultsProps) {
  return (
    <>
      <PublicationList publications={publications} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/research/publications/page"
          searchParamsSuffix={querySuffix}
        />
      )}
    </>
  )
}
