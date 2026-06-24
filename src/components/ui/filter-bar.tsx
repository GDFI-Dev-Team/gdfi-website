'use client' // needs this to rewrite the address bar to user input

import {
  createContext,
  useContext,
  useTransition,
  useRef,
  useEffect,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export const filterInputClasses =
  'px-3 py-2.5 rounded-md border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-btn-primary/50 transition-shadow disabled:opacity-50'

interface FilterBarContextValue {
  searchParams: ReturnType<typeof useSearchParams>
  updateSearchParam: (key: string, value: string) => void
  handleSearchChange: (text: string) => void
  isPending: boolean
}

const FilterBarContext = createContext<FilterBarContextValue | null>(null)

// Lets any filter control (shared or feature-specific) read/update the
// shared query-string state without each one re-deriving router plumbing.
export function useFilterBar() {
  const context = useContext(FilterBarContext)
  if (!context) {
    throw new Error('Filter controls must be rendered inside <FilterBar>')
  }
  return context
}

export default function FilterBar({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Ref encapsulates the timeout token across successive rendering passes
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  function updateSearchParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Filters apply to the whole collection, not the current page, so any
    // filter change should land on page 1 of the new result set — strip a
    // trailing /page/<n> segment rather than keeping the current page number.
    const basePath = pathname.replace(/\/page\/\d+$/, '')

    // wrap in transition to keep the UI fluid and prevent micro-freezes
    startTransition(() => {
      router.push(`${basePath}?${params.toString()}`, { scroll: false })
    })
  }

  // immutable timeout tracking
  function handleSearchChange(text: string) {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      updateSearchParam('q', text)
    }, 350)
  }

  // Clear background timers instantly if user bounces from page during key entry
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <FilterBarContext.Provider
      value={{ searchParams, updateSearchParam, handleSearchChange, isPending }}
    >
      <div className="flex px-(--gutter) bg-foreground/3 border-b border-foreground/10">
        {/* Visual pending line indicating network/data updating state across the edge */}
        {isPending && (
          <div className="absolute top-0 left-0 right-0 h-2px bg-cyan-500 animate-pulse" />
        )}

        <div
          className={cn(
            'mx-auto max-w-7xl w-full py-4 px-1 flex flex-nowrap gap-4 overflow-x-auto',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </FilterBarContext.Provider>
  )
}

// Reusable across every collection page (programs, announcements, ...) — the
// only filter control common enough to live alongside the FilterBar shell.
export function SearchInput({
  placeholder = 'Search...',
}: {
  placeholder?: string
}) {
  const { searchParams, handleSearchChange } = useFilterBar()

  return (
    <div className="relative w-60 max-w-sm shrink-0">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
        size={18}
        aria-hidden="true"
      />
      <input
        type="text"
        defaultValue={searchParams.get('q') || ''}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`w-full pl-10 pr-4 ${filterInputClasses} placeholder:text-foreground/40`}
      />
    </div>
  )
}

export function ClearFilters() {
  const { searchParams, updateSearchParam } = useFilterBar()

  const filterKeys = ['q', 'category', 'sort', 'start_date', 'end_date']
  const hasActiveFilters = filterKeys.some((key) => searchParams.has(key))

  if (!hasActiveFilters) return null

  return (
    <button
      onClick={() => {
        filterKeys.forEach((key) => updateSearchParam(key, ''))
      }}
      className="px-3 py-2.5 rounded-md border border-foreground/15 bg-background text-sm text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
      aria-label="Clear all filters"
    >
      Clear filters
    </button>
  )
}
