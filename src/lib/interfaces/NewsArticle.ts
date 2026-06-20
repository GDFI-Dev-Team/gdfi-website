import { BaseContent } from '@/lib/interfaces/Content'

export interface NewsArticle extends BaseContent {
  author?: string
  status: string
  news_tags: string[]
}
