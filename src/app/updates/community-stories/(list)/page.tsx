import { getCommunityStories } from '@/lib/content/community-stories'
import { CommunityStoriesGrid } from '@/features/updates/community-stories/components/cs-grid'

export default async function CommunityStoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const { items, totalPages, querySuffix } = await getCommunityStories(
    1,
    resolvedParams,
  )
  return (
    <CommunityStoriesGrid
      items={items}
      totalPages={totalPages}
      currentPage={1}
      querySuffix={querySuffix}
    />
  )
}
