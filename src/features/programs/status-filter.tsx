'use client'
import { ChevronDown } from 'lucide-react'
import { useFilterBar, filterInputClasses } from '@/components/ui/filter-bar'

// Modify status options to extract from official list
const STATUS_OPTIONS = ['Completed', 'Active', 'Discontinued']

export default function StatusFilter() {
  const { searchParams, updateSearchParam } = useFilterBar()

  return (
    <div className="relative shrink-0">
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none"
        size={18}
        aria-hidden="true"
      />
      <select
        aria-label="Filter by status"
        defaultValue={searchParams.get('category') || 'all'}
        onChange={(e) => updateSearchParam('category', e.target.value)}
        className={`appearance-none cursor-pointer pr-10 ${filterInputClasses}`}
      >
        <option value="all" disabled>
          Filter Status
        </option>
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}
