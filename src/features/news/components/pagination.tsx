import Button from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function NewsPagination() {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-12 md:mt-16"
    >
      <Button
        variant="ghost"
        className="gap-1 px-3 text-foreground/50 hover:text-foreground"
        aria-label="Previous page"
        disabled
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Prev</span>
      </Button>

      <div className="flex items-center gap-1">
        <Button variant="primary" className="w-10 h-10 p-0" aria-current="page">
          1
        </Button>
        <Button variant="ghost" className="w-10 h-10 p-0">
          2
        </Button>
        <Button variant="ghost" className="w-10 h-10 p-0">
          3
        </Button>
        <span className="px-2 text-foreground/40 select-none">...</span>
        <Button variant="ghost" className="w-10 h-10 p-0">
          8
        </Button>
      </div>

      <Button
        variant="ghost"
        className="gap-1 px-3 text-foreground/70 hover:text-foreground"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} aria-hidden="true" />
      </Button>
    </nav>
  )
}
