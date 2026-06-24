// Shared shape across every content type — markdown collection, slug, title, body.
export interface BaseContent {
  slug: string
  title: string
  body: string
}

// Dated, taggable editorial content (announcements, stories, etc.)
export interface ArticleContent extends BaseContent {
  author?: string
  date: string
  excerpt?: string
  tags?: string[] // generic array for all tags
  featured_images?: string[]
}

export interface Program extends BaseContent {
  status: string
  tag: string
  'short-description': string
  'featured-img': string
}

export interface AnnualReport {
  year: string
  'prepared-by': string
  'annual-report': string
  contributors?: { name: string; role: string }[]
}

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>
export interface PageProps {
  params: Promise<{ page: string }>
  searchParams: SearchParams
}
