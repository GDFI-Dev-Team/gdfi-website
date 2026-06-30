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
import { cn } from '@/lib/utils/cn-merge'

export const filterRadius = 'rounded-md'

export const filterInputClasses = `h-9 px-3 text-xs md:h-11 md:px-3.5 md:text-sm ${filterRadius} border border-border bg-surface text-foreground shadow-sm transition-all placeholder:text-foreground/40 hover:border-foreground/30 hover:shadow focus:outline-none focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/25 disabled:opacity-50`

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
            'mx-auto max-w-7xl w-full pt-3 md:pt-4 flex flex-wrap items-center gap-2 md:gap-4',
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
    <div className="relative min-w-0 flex-1 sm:w-60 sm:max-w-sm sm:flex-none">
      <Search
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/40 md:left-4 md:size-[18px]"
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
        className={cn(filterInputClasses, 'w-full pl-9 pr-4 md:pl-11 md:pr-5')}
      />
    </div>
  )
}

export function ClearFilters() {
  const { searchParams, clearFilters } = useFilterBar()

  const filterKeys = [
    'q',
    'category',
    'tag',
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
      className="h-9 w-9 shrink-0 p-0 flex items-center justify-center md:h-11 md:w-11"
      variant="ghost"
      aria-label="Clear all filters"
      title="Clear all filters"
    >
      <OctagonX className="size-4 md:size-5" />
    </Button>
  )
}
