import Grid from '@/components/ui/grid'
import Pagination from '@/components/ui/pagination'
import ProgramCard from './program-card'
import { Program } from '@/lib/content/types'

interface ProgramsGridProps {
  items: Program[]
  totalPages: number
  currentPage: number
  querySuffix: string
}

export function ProgramsGrid({
  items,
  totalPages,
  currentPage,
  querySuffix,
}: ProgramsGridProps) {
  return (
    <>
      {items.length > 0 ? (
        <Grid articles={items} Card={ProgramCard} />
      ) : (
        <div className="text-center py-12 border border-dashed border-foreground/10 rounded-xl bg-background/50">
          <p className="text-foreground/50 text-sm font-medium">
            No programs match your active filter criteria.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/programs/page"
          searchParamsSuffix={querySuffix}
        />
      )}
    </>
  )
}
