import { notFound } from 'next/navigation'
import ArticleDetail from '@/components/ui/article-detail'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
} from '@/lib/content/markdown'
import { ArticleContent } from '@/lib/content/types'

export function generateStaticParams() {
  const articles = getCollectionMarkdownData<ArticleContent>(
    'updates/community-stories',
  )
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function CommunityStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let article: ArticleContent
  try {
    article = getSingleMarkdownData<ArticleContent>(
      'updates/community-stories',
      `${slug}.md`,
    )
    article.slug = slug
  } catch {
    notFound()
  }

  return (
    <ArticleDetail
      article={article}
      basePath="/updates/community-stories"
      backLabel="Back to Community Stories"
    />
  )
}
