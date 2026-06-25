'use client'

import { useFilterBar, filterInputClasses } from './filter-bar'

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
    <div className="flex flex-nowrap items-center gap-3 shrink-0">
      <div className="flex items-center gap-2 shrink-0">
        <input
          type="number"
          min={minYear}
          max={maxYear}
          placeholder="From"
          aria-label="Start year"
          defaultValue={searchParams.get('start_year') || ''}
          onChange={(e) => updateSearchParam('start_year', e.target.value)}
          className={filterInputClasses}
        />
        <span className="text-foreground/50 text-sm font-medium">to</span>
        <input
          type="number"
          min={minYear}
          max={maxYear}
          placeholder="To"
          aria-label="End year"
          defaultValue={searchParams.get('end_year') || ''}
          onChange={(e) => updateSearchParam('end_year', e.target.value)}
          className={filterInputClasses}
        />
      </div>
    </div>
  )
}
