import { getSingleMarkdownData } from '@/lib/content/markdown'
import { OrgStructure } from '@/features/about-us/org-chart/data/types'

/**
 * Reads the Organizational Structure page content managed in the CMS.
 * Missing sections fall back to empty arrays so the page renders safely.
 */
export function getOrgStructure(): OrgStructure {
  const data = getSingleMarkdownData<Partial<OrgStructure>>(
    'about-us',
    'organizational-structure.md',
  )

  return {
    'board-of-trustees': data['board-of-trustees'] ?? [],
    'admin-and-finance': data['admin-and-finance'] ?? [],
    'project-coordination': data['project-coordination'] ?? [],
    'pool-of-volunteers': data['pool-of-volunteers'] ?? [],
  }
}
