import ArticleCard from '@/components/ui/article-card'
import { ArticleContent } from '@/lib/content/types'

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
      variant="stories"
      fallbackImgUrl="/nav-item-banner-images/community-stories.webp"
      className={className}
    />
  )
}
