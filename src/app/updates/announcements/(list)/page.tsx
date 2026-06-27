import { getAnnouncements } from '@/lib/data/announcements'
import { AnnouncementsGrid } from '@/features/updates/announcements/components/an-grid'

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
    <AnnouncementsGrid
      items={items}
      totalPages={totalPages}
      currentPage={1}
      querySuffix={querySuffix}
    />
  )
}
