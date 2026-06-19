export interface NewsArticle {
  slug: string
  featured_images?: string[]
  title: string
  author?: string
  date: string
  status: string
  news_tags: string[]
  excerpt?: string
  body: string
}
