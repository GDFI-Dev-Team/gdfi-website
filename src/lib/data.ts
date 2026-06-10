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
 * routes as the pages get built. Give any item a `children` array to turn
 * it into a dropdown (desktop) / accordion (mobile).
 */
export const navLinks: NavLink[] = [
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about/our-story' },
      {
        label: 'Mission, Vision & Values',
        href: '/about/mission-vision-values',
      },
      {
        label: 'Organizational Structure',
        href: '/about/org-chart',
      },
    ],
  },
  { label: 'Programs', href: '/programs' },
  { label: 'MPAs', href: '/mpas' },
  { label: 'Research', href: '/research' },
  { label: 'News', href: '/news' },
  { label: 'Resources', href: '/resources' },
]
