import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { ImpactStat } from '@/lib/content/types'

export const MAX_IMPACT_STATS = 4

/**
 * Reads the "Our Impact" stats collection and returns them ordered left-to-right
 * by the `order` field (ascending), capped at {@link MAX_IMPACT_STATS}. Stats
 * without an explicit order fall back to 0, preserving the collection's own order
 * among them.
 */
export function getImpactStats(): ImpactStat[] {
  return getCollectionMarkdownData<ImpactStat>('home/our-impact')
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, MAX_IMPACT_STATS)
}
