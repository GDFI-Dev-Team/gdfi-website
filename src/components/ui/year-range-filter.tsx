'use client'

import { useFilterBar, filterInputClasses } from './filter-bar'
import { cn } from '@/lib/utils'

const CURRENT_YEAR = new Date().getFullYear()

interface YearRangeFilterProps {
  minYear?: number
  maxYear?: number
}

export default function YearRangeFilter({
  minYear = 2000,
  maxYear = CURRENT_YEAR,
}: YearRangeFilterProps) {
  const { searchParams, updateSearchParam } = useFilterBar()

  return (
    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0">
      <input
        type="number"
        min={minYear}
        max={maxYear}
        placeholder="From"
        aria-label="Start year"
        defaultValue={searchParams.get('start_year') || ''}
        onChange={(e) => updateSearchParam('start_year', e.target.value)}
        className={cn(filterInputClasses, 'flex-1 sm:w-auto min-w-[100px]')}
      />
      <span className="text-foreground/50 text-sm font-medium text-center">
        to
      </span>
      <input
        type="number"
        min={minYear}
        max={maxYear}
        placeholder="To"
        aria-label="End year"
        defaultValue={searchParams.get('end_year') || ''}
        onChange={(e) => updateSearchParam('end_year', e.target.value)}
        className={cn(filterInputClasses, 'flex-1 sm:w-auto min-w-[100px]')}
      />
    </div>
  )
}
