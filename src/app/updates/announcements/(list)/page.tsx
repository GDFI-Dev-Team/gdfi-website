import Section from '@/components/ui/section'
import Grid from '@/components/ui/grid'
import Pagination from '@/components/ui/pagination'
import { Metadata } from 'next'
import { getAnnouncementsPage } from '@/lib/announcements'

export const metadata: Metadata = {
  title: 'Announcements',
  description:
    'Stay up to date with the latest stories, interviews, and updates from the Guiuan Development Foundation Inc.',
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AnnouncementsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const { items, totalPages, querySuffix } = await getAnnouncementsPage(
    1,
    resolvedParams,
  )

  return (
    <Section sectionClassName="py-12 md:py-16">
      {items.length > 0 ? (
        <Grid articles={items} />
      ) : (
        <div className="text-center py-12 border border-dashed border-foreground/10 rounded-xl bg-background/50">
          <p className="text-foreground/50 text-sm font-medium">
            No articles match your active filter criteria.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={1}
          totalPages={totalPages}
          baseUrl="/updates/announcements/page"
          searchParamsSuffix={querySuffix}
        />
      )}
    </Section>
  )
}
