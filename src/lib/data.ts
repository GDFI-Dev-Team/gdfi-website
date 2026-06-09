export type NavChild = {
  label: string
  href: string
}

export type NavLink = {
  label: string
  href: string
  /** Optional dropdown / sub-menu items. Empty or omitted = a plain link. */
  children?: NavChild[]
}

/**
 * Primary navigation. These are placeholder hrefs — point them at real
 * routes as the pages get built. "About us" has no sub-links yet; add a
 * `children` array to any item to turn it into a dropdown later.
 */
export const navLinks: NavLink[] = [
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  { label: 'Research', href: '/research' },
  { label: 'MPAs', href: '/mpas' },
  { label: 'Resources', href: '/resources' },
  { label: 'About us', href: '/about' },
]
