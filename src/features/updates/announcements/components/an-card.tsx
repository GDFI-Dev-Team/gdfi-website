import ArticleCard from '@/components/ui/article-card'
import { ArticleContent } from '@/lib/interfaces/content'

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
      fallbackImgUrl="/nav-item-banner-images/announcements.jpeg"
    />
  )
}
