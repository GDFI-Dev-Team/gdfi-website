import { cn } from '@/lib/utils/cn-merge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParamsSuffix?: string
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | null)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const left = Math.max(2, currentPage - 1)
  const right = Math.min(totalPages - 1, currentPage + 1)
  const pages: (number | null)[] = [1]

  if (left > 2) pages.push(null)
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < totalPages - 1) pages.push(null)
  pages.push(totalPages)

  return pages
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParamsSuffix = '',
}: Props) {
  const pages = getPageNumbers(currentPage, totalPages)
  const prevHref = `${baseUrl}/${currentPage - 1}${searchParamsSuffix}`
  const nextHref = `${baseUrl}/${currentPage + 1}${searchParamsSuffix}`

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-0.5 mt-8 md:gap-1 md:mt-16"
    >
      {currentPage <= 1 ? (
        <span
          className="inline-flex items-center gap-1 mx-1 text-xs text-foreground/50 opacity-40 pointer-events-none md:mx-3 md:text-base"
          aria-disabled="true"
        >
          <ChevronLeft className="size-3.5 md:size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Prev</span>
        </span>
      ) : (
        <Link
          href={prevHref}
          className="inline-flex items-center gap-1 px-1 text-xs text-foreground/50 hover:text-foreground md:px-3 md:text-base"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-3.5 md:size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Prev</span>
        </Link>
      )}

      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === null ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 text-foreground/40 select-none"
            >
              ...
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              className={cn(
                buttonBase,
                buttonVariants.primary,
                'w-6 h-6 p-0 text-xs md:w-10 md:h-10 md:text-base',
              )}
              aria-current="page"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={`${baseUrl}/${page}${searchParamsSuffix}`}
              className={cn(
                buttonBase,
                buttonVariants.ghost,
                'w-6 h-6 p-0 text-xs md:w-10 md:h-10 md:text-base',
              )}
              aria-label={`Page ${page}`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {currentPage >= totalPages ? (
        <span
          className="inline-flex items-center gap-1 mx-1 text-xs text-foreground/50 opacity-40 pointer-events-none md:mx-3 md:text-base"
          aria-disabled="true"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-3.5 md:size-4" aria-hidden="true" />
        </span>
      ) : (
        <Link
          href={nextHref}
          className="inline-flex items-center gap-1 px-1 text-xs text-foreground/50 hover:text-foreground md:px-3 md:text-base"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="size-3.5 md:size-4" aria-hidden="true" />
        </Link>
      )}
    </nav>
  )
}
