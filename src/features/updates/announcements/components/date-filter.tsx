'use client'

import { useEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'
import { useFilterBar, filterInputClasses } from '@/components/ui/filter-bar'
import { cn } from '@/lib/utils/cn-merge'

export default function DateFilter() {
  const { searchParams, updateSearchParam, clearFilters } = useFilterBar()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const start = searchParams.get('start_date') || ''
  const end = searchParams.get('end_date') || ''
  const hasDates = Boolean(start || end)

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
        aria-label="Filter by date range"
        className={cn(
          filterInputClasses,
          'flex items-center gap-1.5 md:gap-2',
          hasDates && 'border-btn-primary text-btn-primary',
        )}
      >
        <CalendarDays className="size-4 md:size-[18px]" aria-hidden="true" />
        <span>Date{hasDates ? ' ·' : ''}</span>
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
          aria-label="Date range"
          className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-border bg-surface p-3 shadow-lg"
        >
          <p className="mb-2 text-xs font-semibold text-foreground/60">
            Filter by date
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="date"
              aria-label="Start date"
              value={start}
              onChange={(e) => updateSearchParam('start_date', e.target.value)}
              className={cn(filterInputClasses, 'w-full')}
            />
            <span className="text-center text-xs text-foreground/50">to</span>
            <input
              type="date"
              aria-label="End date"
              value={end}
              onChange={(e) => updateSearchParam('end_date', e.target.value)}
              className={cn(filterInputClasses, 'w-full')}
            />
          </div>
          {hasDates && (
            <button
              type="button"
              onClick={() => clearFilters(['start_date', 'end_date'])}
              className="mt-3 text-xs font-medium text-btn-primary hover:underline"
            >
              Clear dates
            </button>
          )}
        </div>
      )}
    </div>
  )
}
