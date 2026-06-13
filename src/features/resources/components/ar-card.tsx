import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import { FileText, Eye, Download } from 'lucide-react'

export default function AnnualReportCard() {
  return (
    <li className="flex flex-row sm:items-center gap-3">
      <div className="flex items-center gap-3 flex-1">
        <FileText size={40} aria-hidden="true" className="shrink-0" />
        <div className="flex flex-col">
          <Text size="xs">2025 &#xb7; Annual Report</Text>
          <Text size="sm" className="font-semibold">
            Anchored in Community
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-2 xl:flex-row sm:flex-row md:flex-col">
        <Button
          variant="secondary"
          className="px-2 py-0.5 gap-2 items-center flex-1 sm:flex-none"
        >
          <Eye size={15} aria-hidden="true" />
          <Text size="xs">Preview</Text>
        </Button>

        <Button
          variant="primary"
          className="px-2 py-0.5 gap-2 items-center flex-1 sm:flex-none"
        >
          <Download size={15} aria-hidden="true" />
          <Text size="xs">Download</Text>
        </Button>
      </div>
    </li>
  )
}
