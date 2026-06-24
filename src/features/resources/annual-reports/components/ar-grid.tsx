'use client'

import { useState, useRef, useEffect } from 'react'
import AnnualReportCard from './ar-card'
import { AnnualReport } from '@/lib/interfaces/content'

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

export default function AnnualReportGrid({
  reports,
  onReportSelect,
}: {
  reports: AnnualReport[]
  onReportSelect: (pdfUrl: string) => void
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const { ref, maskImage } = useScrollMask<HTMLDivElement>()

  function handleSelect(report: AnnualReport) {
    setSelectedSlug(report.slug)
    onReportSelect(report['annual-report'])
  }

  return (
    <div
      ref={ref}
      className="max-h-[40vh] md:max-h-[55vh] overflow-y-auto"
      style={{ maskImage }}
    >
      <ul
        className="flex flex-col gap-3 list-none"
        role="listbox"
        aria-label="Annual reports"
      >
        {reports.map((report) => (
          <AnnualReportCard
            key={report.slug}
            title={report.title}
            prepared-by={report['prepared-by']}
            pdfUrl={report['annual-report']}
            isSelected={selectedSlug === report.slug}
            onSelect={() => handleSelect(report)}
          />
        ))}
      </ul>
    </div>
  )
}
