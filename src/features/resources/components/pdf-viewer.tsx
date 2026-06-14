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
    <aside className="self-center w-full">
      <div className="rounded-xl bg-foreground/3 border border-foreground/8 flex flex-col overflow-hidden">
        <div className="min-h-105 flex flex-col items-center justify-center gap-4">
          <div className="p-5 rounded-2xl bg-foreground/5 border-foreground/10">
            <FileText
              size={48}
              className="text-foreground/25"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Text size="sm" className="text-foreground/50 font-medium">
              No report selected
            </Text>
            <Text size="xs" className="text-foreground/35">
              Choose a report from the list to preview
            </Text>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 bg-background/60 backdrop-blur-sm border-t border-foreground/8">
          <div className="flex items-center gap-1">
            <Button variant="ghost" className="p-1.5" aria-label="Zoom out">
              <ZoomOut size={16} aria-hidden="true" />
            </Button>
            <Text
              size="xs"
              className="text-foreground/50 text-center tabular-nums"
            >
              100%
            </Text>
            <Button variant="ghost" className="p-1.5" aria-label="Zoom in">
              <ZoomIn size={16} aria-hidden="true" />
            </Button>
          </div>

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
