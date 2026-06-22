'use client' // needs this to rewrite the address bar to user input

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'

export default function NewsFilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Ref encapsulates the timeout token across successive rendering passes
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const inputClasses =
    'px-3 py-2.5 rounded-md border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-btn-primary/50 transition-shadow disabled:opacity-50'

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
    <div className="flex justify-around px-(--gutter) bg-foreground/3 border-b border-foreground/10">
      {/* Visual pending line indicating network/data updating state across the edge */}
      {isPending && (
        <div className="absolute top-0 left-0 right-0 h-2px bg-cyan-500 animate-pulse" />
      )}

      <div className="mx-auto max-w-7xl w-full py-4 px-1 flex flex-nowrap gap-4 items-center overflow-x-auto">
        {/* Text Search Input */}
        <div className="relative w-full max-w-sm shrink-0">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
            size={18}
            aria-hidden="true"
          />
          <input
            type="text"
            defaultValue={searchParams.get('q') || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search news and resources..."
            aria-label="Search news and resources"
            className={`w-full pl-10 pr-4 ${inputClasses} placeholder:text-foreground/40`}
          />
        </div>

        {/* Filter Select Controls */}
        <div className="flex flex-nowrap items-center gap-3 shrink-0">
          {/* Category Selector - mocked pending the tags refactor */}
          <select
            aria-label="Filter by category"
            disabled
            defaultValue="all"
            className={`appearance-none cursor-not-allowed opacity-50 ${inputClasses}`}
          >
            <option value="all">All Categories</option>
            <option value="updates">Latest Updates</option>
            <option value="community-stories">Community Stories</option>
            <option value="interview">Interviews</option>
          </select>

          {/* Sort Order Selector */}
          <select
            aria-label="Sort order"
            defaultValue={searchParams.get('sort') || 'newest'}
            onChange={(e) => updateSearchParam('sort', e.target.value)}
            className={`appearance-none cursor-pointer ${inputClasses}`}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          {/* Range Inputs for Date matching */}
          <div className="flex items-center gap-2 shrink-0">
            <input
              type="date"
              aria-label="Start date"
              defaultValue={searchParams.get('start_date') || ''}
              onChange={(e) => updateSearchParam('start_date', e.target.value)}
              className={inputClasses}
            />
            <span className="text-foreground/50 text-sm font-medium">to</span>
            <input
              type="date"
              aria-label="End date"
              defaultValue={searchParams.get('end_date') || ''}
              onChange={(e) => updateSearchParam('end_date', e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
