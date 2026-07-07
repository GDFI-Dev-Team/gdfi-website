import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { Badge } from '@/lib/content/types'

/**
 * Reads the Badges collection (partners & awards) and returns awards first, then
 * partners — matching the grouped layout of the Trust Badges marquee. Order
 * within each group follows the collection's own append order.
 */
export function getBadges(): Badge[] {
  const all = getCollectionMarkdownData<Badge>('home/badges')

  const awards = all.filter((b) => b.type === 'award')
  const partners = all.filter((b) => b.type !== 'award')

  return [...awards, ...partners]
}
