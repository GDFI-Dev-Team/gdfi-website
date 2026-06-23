export interface BaseContent {
  slug: string
  title: string
  author?: string
  date: string
  body: string
  excerpt?: string
  tags?: string[] // generic array for all tags
  featured_images?: string[]
}
