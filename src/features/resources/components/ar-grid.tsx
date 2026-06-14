'use client'

import { useState } from 'react'
import Text from '@/components/ui/text'
import AnnualReportCard from './ar-card'

const CURRENT_YEAR = new Date().getFullYear()

export default function AnnualReportGrid() {
  const [startYear, setStartYear] = useState('')
  const [endYear, setEndYear] = useState('')
  const [selectedReport, setSelectedReport] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex self-end gap-4 px-4 py-3">
        <label className="flex items-center gap-2">
          <Text size="sm" className="text-foreground/50">
            {' '}
            From{' '}
          </Text>
          <input
            type="number"
            min={2000}
            max={CURRENT_YEAR}
            placeholder="YYYY"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="w-20 border border-foreground/15 rounded-lg px-2 py-1 text-sm bg-background text-foreground"
          />
        </label>
        <label className="flex items-center gap-2">
          <Text size="sm" className="text-foreground/50">
            {' '}
            To{' '}
          </Text>
          <input
            type="number"
            min={2000}
            max={CURRENT_YEAR}
            placeholder="YYYY"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="w-20 border border-foreground/15 rounded-lg px-2 py-1 text-sm bg-background text-foreground"
          />
        </label>
      </div>

      <div className="max-h-[48vh] overflow-y-auto pr-1">
        <ul
          className="flex flex-col gap-3 list-none"
          role="listbox"
          aria-label="Annual reports"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <AnnualReportCard
              key={index}
              isSelected={selectedReport === index}
              onSelect={() => setSelectedReport(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
