import { notFound } from 'next/navigation'
import ArticleDetail from '@/components/ui/article-detail'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
} from '@/lib/content/markdown'
import { ArticleContent } from '@/lib/content/types'

export function generateStaticParams() {
  const articles = getCollectionMarkdownData<ArticleContent>(
    'updates/announcements',
  )
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let article: ArticleContent
  try {
    article = getSingleMarkdownData<ArticleContent>(
      'updates/announcements',
      `${slug}.md`,
    )
    article.slug = slug
  } catch {
    notFound()
  }

  return (
    <ArticleDetail
      article={article}
      basePath="/updates/announcements"
      backLabel="Back to Announcements"
      showDate
    />
  )
}
