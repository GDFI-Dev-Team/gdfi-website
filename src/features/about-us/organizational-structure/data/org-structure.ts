import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { Personnel, PersonnelEntry } from '@/lib/content/types'

const PLACEHOLDER_IMG =
  'https://cdn.gdfi1988.org/gdfi-website-uploads/personnel/placeholder.webp'
const PLACEHOLDER_BIO =
  'Bio coming soon. This is a placeholder description that will be updated with the actual background, experience, and accomplishments of the team member.'

/**
 * Section names as they appear in the Org Structures collection. Personnel are
 * assigned to one of these via the `structure` relation field; the page renders
 * a fixed component per section, so these strings must match the section names.
 */
export const ORG_SECTION_NAMES = {
  boardOfTrustees: 'Board of Trustees',
  adminAndFinance: 'Admin and Finance',
  projectCoordination: 'Project Coordination',
  poolOfVolunteers: 'Pool of Volunteers',
} as const

function toPersonnel(entry: PersonnelEntry): Personnel {
  return {
    name: entry.name,
    role: entry.role,
    image: entry.image || PLACEHOLDER_IMG,
    bio: entry.bio?.trim() || PLACEHOLDER_BIO,
  }
}

/**
 * Reads the Personnel collection and groups people into the four org sections,
 * each sorted by the `order` field (folder collections have no inherent order).
 */
export function getOrgStructure() {
  const all = getCollectionMarkdownData<PersonnelEntry>('about-us/personnel')

  const inSection = (section: string): Personnel[] =>
    all
      .filter((p) => p.structure === section)
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
      .map(toPersonnel)

  return {
    boardOfTrustees: inSection(ORG_SECTION_NAMES.boardOfTrustees),
    adminAndFinance: inSection(ORG_SECTION_NAMES.adminAndFinance),
    projectCoordination: inSection(ORG_SECTION_NAMES.projectCoordination),
    poolOfVolunteers: inSection(ORG_SECTION_NAMES.poolOfVolunteers),
  }
}
