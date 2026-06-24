'use client'

import { useFilterBar, filterInputClasses } from '@/components/ui/filter-bar'

export default function AnnouncementFilters() {
  const { searchParams, updateSearchParam } = useFilterBar()

  return (
    <div className="flex flex-nowrap items-center gap-3 shrink-0">
      {/* Range Inputs for Date matching */}
      <div className="flex items-center gap-2 shrink-0">
        <input
          type="date"
          aria-label="Start date"
          defaultValue={searchParams.get('start_date') || ''}
          onChange={(e) => updateSearchParam('start_date', e.target.value)}
          className={filterInputClasses}
        />
        <span className="text-foreground/50 text-sm font-medium">to</span>
        <input
          type="date"
          aria-label="End date"
          defaultValue={searchParams.get('end_date') || ''}
          onChange={(e) => updateSearchParam('end_date', e.target.value)}
          className={filterInputClasses}
        />
      </div>
    </div>
  )
}
