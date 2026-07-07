// Shared shape across every content type — markdown collection, slug, title, body.
export interface BaseContent {
  slug: string
  title: string
}

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>
export interface PageProps {
  params: Promise<{ page: string }>
  searchParams: SearchParams
}

export interface VideoContent extends BaseContent {
  featured?: boolean
  'youtube-link': string
  date: string
  body: string
}

// Dated, taggable editorial content (announcements, stories, etc.)
export interface ArticleContent extends BaseContent {
  author?: string
  date?: string
  excerpt?: string
  tags?: string[] // generic array for all tags
  featured_images?: string[]
  body: string
}

export interface Program extends BaseContent {
  status: string
  featured?: boolean
  tag: string
  'short-description': string
  'featured-img': string
  partners?: string
  timeline?: string
  body: string
}

export interface AnnualReport extends BaseContent {
  year: string
  'prepared-by': string
  'annual-report': string
  contributors?: { name: string; role: string }[]
}

export interface Publication extends BaseContent {
  authors: string
  year: string
  outlet?: string
  volume?: string
  pages?: string
  link?: string
  pdf?: string
}

export interface CommunityCategory {
  name: string
}

// A single "Our Impact" stat tile — a big accent number/value plus its caption.
export interface ImpactStat {
  value: string
  label: string
  order?: number
}

export type BadgeType = 'award' | 'partner'
export interface Badge {
  name: string
  type: BadgeType
  logo: string
  description?: string
  link?: string
}

export type Personnel = {
  name: string
  role: string
  image: string
  bio: string
}

export type PersonnelEntry = {
  name: string
  role: string
  structure?: string
  order?: number
  image?: string
  bio?: string
}
