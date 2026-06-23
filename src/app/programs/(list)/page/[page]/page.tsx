import Section from '@/components/ui/section'
import Grid from '@/components/ui/grid'
import Pagination from '@/components/ui/pagination'
import ProgramCard from '@/features/programs/program-card'
import { notFound } from 'next/navigation'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { Program } from '@/lib/interfaces/content'
import { getPrograms } from '@/lib/data/programs'
import { CONTENT_LIMITS } from '@/config/content'
import { PageProps } from '@/lib/interfaces/content'

export async function generateStaticParams() {
  const programs = getCollectionMarkdownData<Program>('programs')
  const { totalPages } = paginateItems(programs, 1, CONTENT_LIMITS)
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }))
}

export default async function ProgramsPageRoute({
  params,
  searchParams,
}: PageProps) {
  const [{ page }, resolvedParams] = await Promise.all([params, searchParams])

  const currentPage = Number(page)
  if (!Number.isInteger(currentPage) || currentPage < 1) notFound()

  const { items, totalPages, maxPage, querySuffix } = await getPrograms(
    currentPage,
    resolvedParams,
  )

  if (currentPage > maxPage) notFound()
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
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/programs/page"
          searchParamsSuffix={querySuffix}
        />
      )}
    </Section>
  )
}
