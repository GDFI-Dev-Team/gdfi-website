import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { CommunityCategory } from './types'

export function getCommunityCategories(): string[] {
  return getCollectionMarkdownData<CommunityCategory>(
    'updates/community-categories',
  )
    .map((category) => category.name)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
}
