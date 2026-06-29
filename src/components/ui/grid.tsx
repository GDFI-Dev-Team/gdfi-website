import { ComponentType } from 'react'

interface GridProps<T extends { slug: string }> {
  articles: T[]
  Card: ComponentType<{ article: T }>
}

export default function Grid<T extends { slug: string }>({
  articles,
  Card,
}: GridProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
      {articles.map((article) => (
        <Card key={article.slug} article={article} />
      ))}
    </div>
  )
}
