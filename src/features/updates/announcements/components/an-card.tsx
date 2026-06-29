import ArticleCard from '@/components/ui/article-card'
import { ArticleContent } from '@/lib/content/types'

export default function AnnouncementsCard({
  article,
}: {
  article: ArticleContent
}) {
  return (
    <ArticleCard
      article={article}
      basePath="/updates/announcements"
      showDate
      fallbackImgUrl="/nav-item-banner-images/announcements.webp"
    />
  )
}
