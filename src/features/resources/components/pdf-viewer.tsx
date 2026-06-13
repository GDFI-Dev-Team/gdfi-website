import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
} from 'lucide-react'

export default function PDFViewer() {
  return (
    <aside className="self-center">
      <div className="min-h-100 rounded-xl bg-foreground/3 border border-foreground/8 flex flex-col overflow-hidden relative">
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-foreground/30">
          <FileText size={64} aria-hidden="true" />
          <Text size="sm" className="text-foreground/40">
            Select a report to preview
          </Text>
        </div>

        <div className="flex items-center justify-center gap-3 py-3 bg-background/80 backdrop-blur-sm border-t border-foreground/8">
          <Button variant="ghost" className="p-2" aria-label="Zoom out">
            <ZoomOut size={18} aria-hidden="true" />
          </Button>
          <Text size="sm" className="text-foreground/60 w-10 text-center">
            100%
          </Text>
          <Button variant="ghost" className="p-2" aria-label="Zoom in">
            <ZoomIn size={18} aria-hidden="true" />
          </Button>

          <span className="w-px h-5 bg-foreground/15" aria-hidden="true" />

          <Button variant="ghost" className="p-2" aria-label="Previous page">
            <ChevronLeft size={18} aria-hidden="true" />
          </Button>
          <Text size="sm" className="text-foreground/60 w-16 text-center">
            1 / 24
          </Text>
          <Button variant="ghost" className="p-2" aria-label="Next page">
            <ChevronRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
