import ArticleCard from '@/features/updates/components/article-card'
import { ArticleContent } from '@/lib/interfaces/content'

export default function Card({ article }: { article: ArticleContent }) {
  return (
    <ArticleCard
      article={article}
      basePath="/updates/announcements"
      showDate
      fallbackImgUrl="/nav-item-banner-images/announcements.jpeg"
    />
  )
}
