'use client'

import { useFilterBar, filterInputClasses } from '@/components/ui/filter-bar'

const STATUS_OPTIONS = ['Active', 'Completed', 'On going']

export default function StatusFilter() {
  const { searchParams, updateSearchParam } = useFilterBar()

  return (
    <select
      aria-label="Filter by status"
      defaultValue={searchParams.get('category') || 'all'}
      onChange={(e) => updateSearchParam('category', e.target.value)}
      className={`appearance-none cursor-pointer shrink-0 ${filterInputClasses}`}
    >
      <option value="all">All Statuses</option>
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  )
}
