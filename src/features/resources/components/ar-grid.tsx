'use client'

import { useState, useRef, useEffect } from 'react'
import Text from '@/components/ui/text'
import AnnualReportCard from './ar-card'

const CURRENT_YEAR = new Date().getFullYear()

type ScrollEdge = 'none' | 'top' | 'bottom' | 'both'

const MASKS: Record<ScrollEdge, string> = {
  none: 'none',
  top: 'linear-gradient(to bottom, transparent, black 3rem)',
  bottom: 'linear-gradient(to bottom, black calc(100% - 3rem), transparent)',
  both: 'linear-gradient(to bottom, transparent, black 3rem, black calc(100% - 3rem), transparent)',
}

function useScrollMask<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [edge, setEdge] = useState<ScrollEdge>('bottom')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if (atTop && atBottom) setEdge('none')
      else if (atTop) setEdge('bottom')
      else if (atBottom) setEdge('top')
      else setEdge('both')
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  return { ref, maskImage: MASKS[edge] }
}

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
  const { ref, maskImage } = useScrollMask<HTMLDivElement>()

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

      <div
        ref={ref}
        className="max-h-[60vh] overflow-y-auto"
        style={{ maskImage }}
      >
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
