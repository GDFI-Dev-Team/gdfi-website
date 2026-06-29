export type Personnel = {
  name: string
  role: string
  image: string
  bio: string
}

/** Raw front matter of a content/about-us/personnel/*.md entry. */
export type PersonnelEntry = {
  name: string
  role: string
  /** Structure name, selected via relation against the Org Structures collection. */
  structure?: string
  /** Position within the structure (1 = first). */
  order?: number
  image?: string
  bio?: string
}
