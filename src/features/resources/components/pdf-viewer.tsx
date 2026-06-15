'use client'

import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function PDFViewer() {
  return (
    <aside className="self-center w-full">
      <div className="rounded-xl bg-foreground/3 border border-foreground/8 flex flex-col">
        <div className="overflow-scroll max-h-[70vh] rounded-t-xl [&_canvas]:w-full! [&_canvas]:h-auto!">
          <Document file="/annual-reports/2023-AR.pdf">
            <Page
              pageNumber={3}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>

        <div className="flex justify-center px-4 py-2.5 bg-background/60 backdrop-blur-sm border-t border-foreground/8 rounded-b-xl">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="p-1.5"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </Button>
            <Text
              size="xs"
              className="text-foreground/50 text-center tabular-nums"
            >
              1 / 24
            </Text>
            <Button variant="ghost" className="p-1.5" aria-label="Next page">
              <ChevronRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
