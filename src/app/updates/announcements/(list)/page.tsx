import { getAnnouncements } from '@/lib/data/announcements'
import Section from '@/components/ui/section'
import { AnnouncementsGrid } from '@/features/updates/announcements/announcements-grid'

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const { items, totalPages, querySuffix } = await getAnnouncements(
    1,
    resolvedParams,
  )
  return (
    <Section sectionClassName="py-12 md:py-16">
      <AnnouncementsGrid
        items={items}
        totalPages={totalPages}
        currentPage={1}
        querySuffix={querySuffix}
      />
    </Section>
  )
}
