import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleDetail from '@/components/ui/article-detail'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
} from '@/lib/content/markdown'
import { ArticleContent } from '@/lib/content/types'
import { buildArticleMetadata } from '@/lib/content/metadata'

export function generateStaticParams() {
  const articles = getCollectionMarkdownData<ArticleContent>(
    'updates/community-stories',
  )
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const article = getSingleMarkdownData<ArticleContent>(
      'updates/community-stories',
      `${slug}.md`,
    )
    return buildArticleMetadata(
      article,
      `/updates/community-stories/${slug}`,
      '/nav-item-banner-images/community-stories.jpeg',
    )
  } catch {
    return {}
  }
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
