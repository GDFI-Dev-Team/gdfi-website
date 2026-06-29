'use client'

import {
  createContext,
  useContext,
  useTransition,
  useRef,
  useEffect,
  useState,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { OctagonX, Search } from 'lucide-react'
import Button from './button'
import { cn } from '@/lib/utils'

export const filterInputClasses =
  'h-11 px-3 rounded-lg border border-border bg-surface text-sm text-foreground shadow-sm transition-colors placeholder:text-foreground/40 hover:border-foreground/25 focus:outline-none focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/30 disabled:opacity-50'

interface FilterBarContextValue {
  searchParams: ReturnType<typeof useSearchParams>
  updateSearchParam: (key: string, value: string) => void
  clearFilters: (keys: string[]) => void
  handleSearchChange: (text: string) => void
  isPending: boolean
}

export const FilterBarContext = createContext<FilterBarContextValue | null>(
  null,
)

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

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  function updateSearchParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    const basePath = pathname.replace(/\/page\/\d+$/, '')

    startTransition(() => {
      router.push(`${basePath}?${params.toString()}`, { scroll: false })
    })
  }

  function clearFilters(keys: string[]) {
    const params = new URLSearchParams(searchParams.toString())
    keys.forEach((key) => params.delete(key))
    const basePath = pathname.replace(/\/page\/\d+$/, '')
    startTransition(() => {
      router.push(`${basePath}?${params.toString()}`, { scroll: false })
    })
  }

  function handleSearchChange(text: string) {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      updateSearchParam('q', text)
    }, 350)
  }

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <FilterBarContext.Provider
      value={{
        searchParams,
        updateSearchParam,
        clearFilters,
        handleSearchChange,
        isPending,
      }}
    >
      <div className="relative flex px-(--gutter)">
        {isPending && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500 animate-pulse" />
        )}

        <div
          className={cn(
            'mx-auto max-w-7xl w-full py-3 md:py-4 flex flex-wrap items-center gap-2 md:gap-4',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </FilterBarContext.Provider>
  )
}

export function SearchInput({
  placeholder = 'Search...',
}: {
  placeholder?: string
}) {
  const { searchParams, handleSearchChange } = useFilterBar()
  const paramValue = searchParams.get('q') || ''
  const [value, setValue] = useState(paramValue)
  const [prevParam, setPrevParam] = useState(paramValue)

  // Controlled so external param changes (Clear Filters, browser back) reflect
  // back into the field — `defaultValue` only ever set the initial value. Synced
  // during render rather than in an effect to avoid a cascading re-render.
  if (paramValue !== prevParam) {
    setPrevParam(paramValue)
    setValue(paramValue)
  }

  return (
    <div className="relative w-full sm:w-60 max-w-sm shrink-0">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
        size={18}
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          handleSearchChange(e.target.value)
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(filterInputClasses, 'w-full pl-10 pr-4')}
      />
    </div>
  )
}

export function ClearFilters() {
  const { searchParams, clearFilters } = useFilterBar()

  const filterKeys = [
    'q',
    'category',
    'sort',
    'start_date',
    'end_date',
    'start_year',
    'end_year',
  ]
  const hasActiveFilters = filterKeys.some((key) => searchParams.has(key))

  if (!hasActiveFilters) return null

  return (
    <Button
      onClick={() => {
        clearFilters(filterKeys)
      }}
      className="h-11 w-11 shrink-0 p-0 flex items-center justify-center"
      variant="ghost"
      aria-label="Clear all filters"
      title="Clear all filters"
    >
      <OctagonX className="size-5" />
    </Button>
  )
}
