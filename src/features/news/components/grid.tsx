import { NewsArticle } from '@/lib/interfaces/NewsArticle' // removed useState pagination because it hurts SEO
import NewsCard from './card'

export default function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((article) => (
        <NewsCard key={article.slug} article={article} />
      ))}
    </div>
  )
}
