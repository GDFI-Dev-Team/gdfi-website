import ArticleCard from '@/components/ui/article-card'
import { ArticleContent, Program } from '@/lib/content/types'

// Adapts a Program onto the shared ArticleCard ("programs" variant): status +
// tag pills, a date range below the title, and the short description preview.
export default function ProgramCard({
  article: program,
}: {
  article: Program
}) {
  const article: ArticleContent = {
    slug: program.slug,
    title: program.title,
    date: program.date,
    body: program['short-description'],
    featured_images: [program['featured-img']],
    tags: program.tag ? [program.tag] : [],
  }

  return (
    <ArticleCard
      article={article}
      basePath="/our-works/programs-and-projects"
      variant="programs"
      fallbackImgUrl="/nav-item-banner-images/programs.webp"
      status={program.status}
      dateRange={program.timeline}
    />
  )
}
