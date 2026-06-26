'use client'

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
        handleSearchChange,
        isPending,
      }}
    >
      <div className="relative flex px-(--gutter) bg-foreground/3 border-b border-foreground/10">
        {isPending && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500 animate-pulse" />
        )}

        <div
          className={cn(
            'mx-auto max-w-7xl w-full py-4 flex flex-wrap items-center gap-3 md:gap-4',
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

  return (
    <div className="relative w-full sm:w-60 max-w-sm shrink-0">
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
