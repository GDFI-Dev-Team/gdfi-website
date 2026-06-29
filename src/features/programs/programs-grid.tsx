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
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {items.map((program) => (
            <ProgramCard key={program.slug} article={program} />
          ))}
        </div>
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
          baseUrl="/our-works/programs-and-projects/page"
          searchParamsSuffix={querySuffix}
        />
      )}
    </>
  )
}
