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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((article) => (
        <Card key={article.slug} article={article} />
      ))}
    </div>
  )
}
