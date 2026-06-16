'use client'

import { useState } from 'react'
import Text from '@/components/ui/text'
import AnnualReportCard from './ar-card'

const CURRENT_YEAR = new Date().getFullYear()

export interface AnnualReport {
  slug: string
  title: string
  year: string
  'prepared-by': string
  'annual-report': string
  contributors?: { name: string; role: string }[]
}

interface AnnualReportGridProps {
  reports: AnnualReport[]
  onReportSelect: (pdfUrl: string) => void
}

export default function AnnualReportGrid({
  reports,
  onReportSelect,
}: AnnualReportGridProps) {
  const [startYear, setStartYear] = useState('')
  const [endYear, setEndYear] = useState('')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)

  const filtered = reports.filter((r) => {
    const y = Number(r.year)
    if (startYear && y < Number(startYear)) return false
    if (endYear && y > Number(endYear)) return false
    return true
  })

  function handleSelect(report: AnnualReport) {
    setSelectedSlug(report.slug)
    onReportSelect(report['annual-report'])
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex self-end gap-4 py-2">
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

      <div className="max-h-[60vh] overflow-y-auto [animation-name:scroll-mask] [animation-timeline:scroll(self)]">
        <ul
          className="flex flex-col gap-3 list-none"
          role="listbox"
          aria-label="Annual reports"
        >
          {filtered.map((report) => (
            <AnnualReportCard
              key={report.slug}
              title={report.title}
              year={report.year}
              pdfUrl={report['annual-report']}
              isSelected={selectedSlug === report.slug}
              onSelect={() => handleSelect(report)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
