'use client'

import { useMemo, useState } from 'react'
import Text from '@/components/ui/text'
import { Search } from 'lucide-react'
import PublicationCard from './pub-card'

export interface Publication {
  slug: string
  title: string
  authors: string
  year: string
  outlet?: string
  volume?: string
  pages?: string
  citedBy?: string
  link?: string
  pdf?: string
}

interface PublicationListProps {
  publications: Publication[]
}

export default function PublicationList({
  publications,
}: PublicationListProps) {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('all')

  const years = useMemo(
    () =>
      Array.from(new Set(publications.map((p) => p.year))).sort(
        (a, b) => Number(b) - Number(a),
      ),
    [publications],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publications.filter((p) => {
      if (year !== 'all' && p.year !== year) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        (p.outlet?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [publications, query, year])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative flex-1 sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or journal"
            aria-label="Search publications"
            className="w-full rounded-lg border border-foreground/15 bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-foreground/40 outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
          />
        </label>

        <label className="flex items-center gap-2 self-end sm:self-auto">
          <Text size="sm" className="text-foreground/50">
            Year
          </Text>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            aria-label="Filter by year"
            className="rounded-lg border border-foreground/15 bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
          >
            <option value="all">All</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-1 py-20 text-center">
          <Text size="sm" className="font-medium text-foreground/50">
            No publications found
          </Text>
          <Text size="xs" className="text-foreground/35">
            Try a different search or year
          </Text>
        </div>
      ) : (
        <ul className="flex list-none flex-col gap-4">
          {filtered.map((pub, i) => (
            <PublicationCard key={pub.slug} publication={pub} index={i} />
          ))}
        </ul>
      )}
    </div>
  )
}
