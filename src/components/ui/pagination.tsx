import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
      className="flex items-center justify-center gap-1 mt-12 md:mt-16"
    >
      {currentPage <= 1 ? (
        <span
          className={cn(
            buttonBase,
            buttonVariants.ghost,
            'gap-1 px-3 text-foreground/50 opacity-40 pointer-events-none',
          )}
          aria-disabled="true"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Prev</span>
        </span>
      ) : (
        <Link
          href={prevHref}
          className={cn(
            buttonBase,
            buttonVariants.ghost,
            'gap-1 px-3 text-foreground/50 hover:text-foreground',
          )}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} aria-hidden="true" />
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
                'w-10 h-10 p-0',
              )}
              aria-current="page"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={`${baseUrl}/${page}${searchParamsSuffix}`}
              className={cn(buttonBase, buttonVariants.ghost, 'w-10 h-10 p-0')}
              aria-label={`Page ${page}`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {currentPage >= totalPages ? (
        <span
          className={cn(
            buttonBase,
            buttonVariants.ghost,
            'gap-1 px-3 text-foreground/70 opacity-40 pointer-events-none',
          )}
          aria-disabled="true"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} aria-hidden="true" />
        </span>
      ) : (
        <Link
          href={nextHref}
          className={cn(
            buttonBase,
            buttonVariants.ghost,
            'gap-1 px-3 text-foreground/70 hover:text-foreground',
          )}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      )}
    </nav>
  )
}
