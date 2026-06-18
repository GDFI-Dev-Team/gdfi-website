'use client'

import { useState } from 'react'
import ProgramCard from '@/features/programs/program-card'
import Button from '@/components/ui/button'
import Text from '@/components/ui/text'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export interface Program {
  slug: string
  title: string
  'short-description': string
  status: string
  tag: string
  'featured-img': string
}

interface ProgramsGridProps {
  programs: Program[]
}

const PROGRAMS_PER_PAGE = 6

export default function ProgramsGrid({ programs }: ProgramsGridProps) {
  const [page, setPage] = useState(1)
  const pagination = Math.ceil(programs.length / PROGRAMS_PER_PAGE)
  const visiblePrograms = programs.slice(
    (page - 1) * PROGRAMS_PER_PAGE,
    page * PROGRAMS_PER_PAGE,
  )

  return (
    <section className="px-(--gutter) py-16 md:py-24">
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search GDFI programs..."
          aria-label="Search GDFI programs"
        />

        <select name="Program Status">
          <option disabled>Program Status</option>
          <option value="active">Completed</option>
          <option value="active">Active</option>
          <option value="active">Discontinued</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 align-center mt-6">
        {visiblePrograms.map((program) => (
          <ProgramCard
            key={program.slug}
            title={program.title}
            description={program['short-description']}
            imageUrl="/feat-hero/hero-2.webp"
            status={program.status}
            href={`/programs/${program.slug}`}
          />
        ))}
      </div>

      {pagination > 1 && (
        <div className="flex gap-4 items-center justify-center mt-10">
          <Button
            variant="ghost"
            className="p-1.5"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="size-7" />
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: pagination }).map((_, index) => (
              <Button
                variant={page === index + 1 ? 'primary' : 'secondary'}
                key={index}
                className="px-4 py-2"
                aria-current={page === index + 1 ? 'page' : undefined}
                onClick={() => setPage(index + 1)}
              >
                <Text size="xs">{index + 1}</Text>
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            className="p-1.5"
            aria-label="Next page"
            disabled={page === pagination}
            onClick={() => setPage((p) => Math.min(pagination, p + 1))}
          >
            <ChevronRight className="size-7" />
          </Button>
        </div>
      )}
    </section>
  )
}
