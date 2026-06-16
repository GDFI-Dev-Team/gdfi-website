'use client'

import { useState } from 'react'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  FileQuestionMark,
  type LucideIcon,
} from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import { handlePagination } from '@/lib/utils'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

interface PDFViewerProps {
  file: string | null
}

function PDFPlaceholder({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="overflow-scroll min-h-105 flex flex-col items-center justify-center gap-4">
      <div className="p-5 rounded-2xl bg-foreground/5 border border-foreground/10">
        <Icon size={48} className="text-foreground/25" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <Text size="sm" className="text-foreground/50 font-medium">
          {title}
        </Text>
        <Text size="xs" className="text-foreground/35">
          {description}
        </Text>
      </div>
    </div>
  )
}

function PDFLoading() {
  return (
    <div
      className="animate-pulse overflow-scroll min-h-105 flex flex-col items-center justify-center gap-4"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="p-5 rounded-2xl bg-foreground/8 border border-foreground/10">
        <div className="w-12 h-12 rounded-lg bg-foreground/10" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="h-3.5 w-28 rounded bg-foreground/10" />
        <div className="h-3 w-40 rounded bg-foreground/8" />
      </div>
    </div>
  )
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [renderedPageNumber, setRenderedPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  const isLoading = renderedPageNumber !== pageNumber

  return (
    <aside className="w-full">
      <div className="w-full rounded-xl bg-foreground/3 border border-foreground/8 flex flex-col">
        <div className="overflow-scroll max-h-[70vh] rounded-t-xl [&_canvas]:w-full! [&_canvas]:h-auto!">
          <Document
            file={file}
            noData={
              <PDFPlaceholder
                icon={FileText}
                title="No report selected"
                description="Choose a report from the list to preview"
              />
            }
            loading={<PDFLoading />}
            error={
              <PDFPlaceholder
                icon={FileQuestionMark}
                title="Error loading file at this time"
                description="Choose a different report to preview"
              />
            }
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <div className="relative">
              {isLoading && (
                <Page
                  key={renderedPageNumber}
                  pageNumber={renderedPageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="absolute inset-0"
                />
              )}
              <Page
                key={pageNumber}
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
                className={isLoading ? 'invisible' : undefined}
              />
            </div>
          </Document>
        </div>

        <div className="flex justify-center px-4 py-2.5 bg-background/60 backdrop-blur-sm border-t border-foreground/8 rounded-b-xl">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="p-1.5"
              aria-label="Previous page"
              onClick={() => handlePagination('prev', setPageNumber, numPages)}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </Button>
            <Text
              size="xs"
              className="text-foreground/50 text-center tabular-nums"
            >
              {pageNumber} / {numPages ?? '1'}
            </Text>
            <Button
              variant="ghost"
              className="p-1.5"
              aria-label="Next page"
              onClick={() => handlePagination('next', setPageNumber, numPages)}
              disabled={pageNumber >= (numPages ?? 1)}
            >
              <ChevronRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
