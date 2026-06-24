import Grid from '@/components/ui/grid'
import Pagination from '@/components/ui/pagination'
import Card from './components/card'
import { ArticleContent } from '@/lib/interfaces/content'

interface AnnouncementsGridProps {
  items: ArticleContent[]
  totalPages: number
  currentPage: number
  querySuffix: string
}

export function AnnouncementsGrid({
  items,
  totalPages,
  currentPage,
  querySuffix,
}: AnnouncementsGridProps) {
  return (
    <>
      {items.length > 0 ? (
        <Grid articles={items} Card={Card} />
      ) : (
        <div className="text-center py-12 border border-dashed border-foreground/10 rounded-xl bg-background/50">
          <p className="text-foreground/50 text-sm font-medium">
            No articles match your active filter criteria.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/updates/announcements/page"
          searchParamsSuffix={querySuffix}
        />
      )}
    </>
  )
}
