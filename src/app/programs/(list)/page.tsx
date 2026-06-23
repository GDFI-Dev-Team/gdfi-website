import Section from '@/components/ui/section'
import Grid from '@/components/ui/grid'
import Pagination from '@/components/ui/pagination'
import { Metadata } from 'next'
import { getPrograms } from '@/lib/data/programs'
import ProgramCard from '@/features/programs/program-card'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Discover the different programs of Guiuan Development Foundation Inc. and how you can provide support.',
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProgramsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const { items, totalPages, querySuffix } = await getPrograms(
    1,
    resolvedParams,
  )

  return (
    <Section sectionClassName="py-12 md:py-16">
      {items.length > 0 ? (
        <Grid articles={items} Card={ProgramCard} />
      ) : (
        <div className="text-center py-12 border border-dashed border-foreground/10 rounded-xl bg-background/50">
          <p className="text-foreground/50 text-sm font-medium">
            No programs match your active filter criteria.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={1}
          totalPages={totalPages}
          baseUrl="/programs/page"
          searchParamsSuffix={querySuffix}
        />
      )}
    </Section>
  )
}
