'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import AnnualReportGrid from './ar-grid'
import { AnnualReport } from '@/resources/annual-reports/page'

const PDFViewer = dynamic(() => import('./pdf-viewer'), { ssr: false })

interface AnnualReportsShellProps {
  reports: AnnualReport[] // For array of annual reports
}

export default function AnnualReportsShell({
  reports,
}: AnnualReportsShellProps) {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <AnnualReportGrid reports={reports} onReportSelect={setSelectedPdfUrl} />
      <PDFViewer file={selectedPdfUrl} />
    </div>
  )
}
