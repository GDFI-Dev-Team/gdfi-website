import ArticleCard from '@/components/ui/article-card'
import { ArticleContent } from '@/lib/interfaces/content'

export default function CommunityStoriesCard({
  article,
  className,
}: {
  article: ArticleContent
  className?: string
}) {
  return (
    <ArticleCard
      article={article}
      basePath="/updates/community-stories"
      fallbackImgUrl="/nav-item-banner-images/community-stories.jpeg"
      className={className}
    />
  )
}
