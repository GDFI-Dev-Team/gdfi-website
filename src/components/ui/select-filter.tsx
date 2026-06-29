'use client'

import { ChevronDown } from 'lucide-react'
import { useFilterBar, filterInputClasses } from './filter-bar'
import { cn } from '@/lib/utils/cn-merge'

interface SelectFilterProps {
  paramKey: string
  options: { label: string; value: string }[]
  placeholder: string
  label: string
  className?: string
}

export default function SelectFilter({
  paramKey,
  options,
  placeholder,
  label,
  className,
}: SelectFilterProps) {
  const { searchParams, updateSearchParam } = useFilterBar()

  return (
    <div className={cn('relative w-full sm:w-auto shrink-0', className)}>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none"
        size={18}
        aria-hidden="true"
      />
      <select
        aria-label={label}
        defaultValue={searchParams.get(paramKey) || 'all'}
        onChange={(e) => updateSearchParam(paramKey, e.target.value)}
        className={cn(
          filterInputClasses,
          'w-full appearance-none cursor-pointer pr-10',
        )}
      >
        <option value="all" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
