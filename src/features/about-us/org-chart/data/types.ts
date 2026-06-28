export type Personnel = {
  name: string
  role: string
  image: string
  bio: string
}

/**
 * Shape of content/about-us/organizational-structure.md front matter.
 * Section keys are kebab-case to match the CMS field names; each list is
 * rendered in order, so reordering in the CMS reorders the page.
 */
export type OrgStructure = {
  'board-of-trustees': Personnel[]
  'admin-and-finance': Personnel[]
  'project-coordination': Personnel[]
  'pool-of-volunteers': Personnel[]
}
