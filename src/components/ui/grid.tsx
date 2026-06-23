import { BaseContent } from '@/lib/interfaces/content'
import Card from '@/features/updates/announcements/components/card'

export default function Grid({ articles }: { articles: BaseContent[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((article) => (
        <Card key={article.slug} article={article} />
      ))}
    </div>
  )
}
