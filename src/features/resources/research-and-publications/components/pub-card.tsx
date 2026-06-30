import Text from '@/components/ui/text'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils/cn-merge'
import type { Publication } from '@/lib/content/types'

interface PublicationCardProps {
  publication: Publication
  index?: number
}

export default function PublicationCard({
  publication,
  index = 0,
}: PublicationCardProps) {
  const { title, authors, year, outlet, volume, pages, link } = publication

  // Citation line: "Outlet · 14(11) · 2775–2794" — skip any missing parts.
  const citation = [outlet, volume, pages].filter(Boolean).join(' · ')

  return (
    <li
      style={{ animationDelay: `${index * 60}ms` }}
      className={cn(
        'animate-fade-up group flex flex-col gap-1.5 rounded-xl border border-foreground/8 bg-surface p-3',
        'transition-all duration-200 hover:border-foreground/15 hover:shadow-[0_2px_12px_rgb(0_0_0/0.04)]',
        'sm:flex-row sm:items-start sm:gap-6 sm:p-5',
      )}
    >
      {/* Year — an inline meta line on mobile, a left rail on desktop */}
      <div className="flex shrink-0 items-baseline gap-2 sm:w-16 sm:flex-col sm:items-start sm:gap-1">
        <Text
          size="md"
          className="text-sm font-semibold tabular-nums leading-none text-foreground sm:text-lg"
        >
          {year}
        </Text>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-1.5">
        <Text
          size="md"
          className="text-sm font-semibold leading-snug sm:text-base"
        >
          {title}
        </Text>
        <Text size="sm" className="text-xs text-foreground/55 sm:text-sm">
          {authors || 'GDFI'}
        </Text>
        {citation && (
          <Text size="xs" className="italic text-foreground/45">
            {citation}
          </Text>
        )}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View article: ${title}`}
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg py-1.5 text-btn-primary outline-none sm:px-3',
            'transition-colors hover:bg-btn-primary/8 focus-visible:ring-2 focus-visible:ring-btn-primary/50',
          )}
        >
          <Text size="xs" className="font-medium">
            View article
          </Text>
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      )}
    </li>
  )
}
