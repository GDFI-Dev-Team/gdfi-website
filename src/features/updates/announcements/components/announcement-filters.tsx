'use client'

import { useFilterBar, filterInputClasses } from '@/components/ui/filter-bar'

export default function AnnouncementFilters() {
  const { searchParams, updateSearchParam } = useFilterBar()

  return (
    <div className="flex flex-nowrap items-center gap-3 shrink-0">
      {/* Category Selector - mocked pending the tags refactor */}
      <select
        aria-label="Filter by category"
        disabled
        defaultValue="all"
        className={`appearance-none cursor-not-allowed opacity-50 ${filterInputClasses}`}
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
        className={`appearance-none cursor-pointer ${filterInputClasses}`}
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
