'use client'

import { useState } from 'react'
import { AnnualReport } from '@/lib/content/types'
import dynamic from 'next/dynamic'
import AnnualReportGrid from './ar-grid'

const PDFViewer = dynamic(() => import('./pdf-viewer'), { ssr: false })

export default function AnnualReportsShell({
  reports,
}: {
  reports: AnnualReport[]
}) {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <AnnualReportGrid reports={reports} onReportSelect={setSelectedPdfUrl} />
      <PDFViewer file={selectedPdfUrl} />
    </div>
  )
}
