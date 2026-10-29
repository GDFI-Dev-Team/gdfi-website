import { ComponentType } from 'react'
import Reveal from '@/components/ui/reveal'

interface GridProps<T extends { slug: string }> {
  articles: T[]
  Card: ComponentType<{ article: T }>
}

export default function Grid<T extends { slug: string }>({
  articles,
  Card,
}: GridProps<T>) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-8 list-none p-0 m-0">
      {articles.map((article, index) => (
        <Reveal
          as="li"
          key={article.slug}
          delay={index}
          className="flex flex-col"
        >
          <Card article={article} />
        </Reveal>
      ))}
    </ul>
  )
}
