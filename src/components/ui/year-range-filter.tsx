'use client'

import { useState } from 'react'
import { useFilterBar } from './filter-bar'
import { cn } from '@/lib/utils/cn-merge'

const CURRENT_YEAR = new Date().getFullYear()

interface YearRangeFilterProps {
  minYear?: number
  maxYear?: number
}

// Transparent fields sit inside one bordered, shared-focus group below.
const yearInputClasses =
  'h-11 w-full sm:w-20 bg-transparent px-3 text-sm text-center tabular-nums text-foreground placeholder:text-foreground/40 focus:outline-none disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'

export default function YearRangeFilter({
  minYear = 2000,
  maxYear = CURRENT_YEAR,
}: YearRangeFilterProps) {
  const { searchParams, updateSearchParam } = useFilterBar()
  const startParam = searchParams.get('start_year') || ''
  const endParam = searchParams.get('end_year') || ''

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

  return (
    <div className="flex flex-1 items-stretch rounded-lg border border-border bg-surface shadow-sm transition-colors hover:border-foreground/25 focus-within:border-btn-primary focus-within:ring-2 focus-within:ring-btn-primary/30 sm:w-auto sm:flex-none">
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
        className={cn(yearInputClasses, 'flex-1 rounded-l-lg')}
      />
      <span
        className="flex select-none items-center px-1 text-sm text-foreground/40"
        aria-hidden="true"
      >
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
        className={cn(yearInputClasses, 'flex-1 rounded-r-lg')}
      />
    </div>
  )
}
