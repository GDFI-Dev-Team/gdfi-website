'use client'

import { useEffect, useRef, useState } from 'react'
import { CalendarRange, ChevronDown } from 'lucide-react'
import { useFilterBar, filterInputClasses } from './filter-bar'
import { cn } from '@/lib/utils/cn-merge'

const CURRENT_YEAR = new Date().getFullYear()

interface YearRangeFilterProps {
  minYear?: number
  maxYear?: number
}

const yearInputClasses =
  'text-center tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'

export default function YearRangeFilter({
  minYear = 2000,
  maxYear = CURRENT_YEAR,
}: YearRangeFilterProps) {
  const { searchParams, updateSearchParam, clearFilters } = useFilterBar()
  const startParam = searchParams.get('start_year') || ''
  const endParam = searchParams.get('end_year') || ''

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Controlled so Clear Filters / browser navigation reset the fields. Synced
  // during render rather than in an effect to avoid a cascading re-render.
  const [start, setStart] = useState(startParam)
  const [end, setEnd] = useState(endParam)
  const [prev, setPrev] = useState({ start: startParam, end: endParam })

  if (prev.start !== startParam || prev.end !== endParam) {
    setPrev({ start: startParam, end: endParam })
    setStart(startParam)
    setEnd(endParam)
  }

  const hasYears = Boolean(startParam || endParam)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Filter by year range"
        className={cn(
          filterInputClasses,
          'flex items-center gap-1.5 md:gap-2',
          hasYears && 'border-btn-primary text-btn-primary',
        )}
      >
        <CalendarRange className="size-4 md:size-[18px]" aria-hidden="true" />
        <span>Year{hasYears ? ' ·' : ''}</span>
        <ChevronDown
          className={cn(
            'size-4 transition-transform md:size-[18px]',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Year range"
          className="absolute right-0 z-50 mt-2 w-60 rounded-lg border border-border bg-surface p-3 shadow-lg"
        >
          <p className="mb-2 text-xs font-semibold text-foreground/60">
            Filter by year
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={minYear}
              max={maxYear}
              placeholder="From"
              aria-label="Start year"
              value={start}
              onChange={(e) => {
                setStart(e.target.value)
                updateSearchParam('start_year', e.target.value)
              }}
              className={cn(filterInputClasses, yearInputClasses, 'w-full')}
            />
            <span className="text-foreground/40" aria-hidden="true">
              –
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={minYear}
              max={maxYear}
              placeholder="To"
              aria-label="End year"
              value={end}
              onChange={(e) => {
                setEnd(e.target.value)
                updateSearchParam('end_year', e.target.value)
              }}
              className={cn(filterInputClasses, yearInputClasses, 'w-full')}
            />
          </div>
          {hasYears && (
            <button
              type="button"
              onClick={() => clearFilters(['start_year', 'end_year'])}
              className="mt-3 text-xs font-medium text-btn-primary hover:underline"
            >
              Clear years
            </button>
          )}
        </div>
      )}
    </div>
  )
}
