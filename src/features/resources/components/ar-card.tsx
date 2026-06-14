import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnnualReportCardProps {
  isSelected?: boolean
  onSelect?: () => void
}

export default function AnnualReportCard({
  isSelected = false,
  onSelect,
}: AnnualReportCardProps) {
  return (
    <li
      onClick={onSelect}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect?.()}
      role="option"
      aria-selected={isSelected}
      className={cn(
        'flex items-center gap-4 rounded-xl border p-4 cursor-pointer select-none',
        'transition-all outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50',
        isSelected
          ? 'border-btn-primary bg-btn-primary/10 shadow-sm'
          : 'border-foreground/8 bg-foreground/3 hover:border-foreground/15 hover:bg-foreground/5',
      )}
    >
      <div
        className={cn(
          'shrink-0 transition-colors',
          isSelected ? 'text-btn-primary' : 'text-foreground/35',
        )}
      >
        <FileText size={36} aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <Text size="xs" className="text-foreground/50">
          2025 &#xb7; Annual Report
        </Text>
        <Text size="sm" className="font-semibold truncate">
          Anchored in Community
        </Text>
      </div>

      <Button
        variant={isSelected ? 'primary' : 'secondary'}
        className="px-3 py-1.5 gap-1.5 shrink-0"
        onClick={(e) => e.stopPropagation()}
        aria-label="Download annual report"
      >
        <Download size={14} aria-hidden="true" />
        <Text size="xs">Download</Text>
      </Button>
    </li>
  )
}
