'use client'

import { useFilterBar, filterInputClasses } from '@/components/ui/filter-bar'
import { cn } from '@/lib/utils'

export default function DateFilter() {
  const { searchParams, updateSearchParam } = useFilterBar()

  return (
    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0">
      <input
        type="date"
        aria-label="Start date"
        defaultValue={searchParams.get('start_date') || ''}
        onChange={(e) => updateSearchParam('start_date', e.target.value)}
        className={cn(filterInputClasses, 'flex-1 sm:w-auto min-w-[130px]')}
      />
      <span className="text-foreground/50 text-sm font-medium text-center">
        to
      </span>
      <input
        type="date"
        aria-label="End date"
        defaultValue={searchParams.get('end_date') || ''}
        onChange={(e) => updateSearchParam('end_date', e.target.value)}
        className={cn(filterInputClasses, 'flex-1 sm:w-auto min-w-[130px]')}
      />
    </div>
  )
}
