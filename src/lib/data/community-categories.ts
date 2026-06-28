import { getCollectionMarkdownData } from '@/lib/markdown'

interface CommunityCategory {
  name: string
}

/**
 * Reads the open-ended community-story categories defined in the CMS
 * (content/updates/community-categories). Used to populate the stories
 * category filter so options stay in sync with the editorial taxonomy.
 */
export function getCommunityCategories(): string[] {
  return getCollectionMarkdownData<CommunityCategory>(
    'updates/community-categories',
  )
    .map((category) => category.name)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
}
