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
        href: '/about/mission-vision',
      },
      {
        label: 'Organizational Structure',
        href: '/about/organizational-structure',
      },
    ],
  },
  { label: 'Programs', href: '/programs' },
  { label: 'MPAs', href: '/mpas' },
  { label: 'Research', href: '/research' },
  { label: 'News', href: '/news' },
  { label: 'Resources', href: '/resources' },
]

/**
 * Organization details — single source of truth for contact info shown in
 * the footer (and reusable elsewhere). Adjust `founded` / `about` as needed.
 */
export const org = {
  name: 'Guiuan Development Foundation, Inc.',
  shortName: 'GDFI',
  founded: 1988,
  email: 'gdfi1988@gmail.com',
  address: 'Guimbaolibot Avenue, Brgy. 10, Guiuan, Eastern Samar, 6809',
  mapUrl: 'https://maps.app.goo.gl/gF2VHxrbyNKbE9TA9',
  about:
    'A community-rooted foundation advancing sustainable development and coastal resource management across Eastern Samar.',
}

/** Social profile URLs. Icons are paired in the footer component. */
export const socials = {
  facebook: 'https://www.facebook.com/gdfi1988',
  instagram: 'https://www.instagram.com/hello.gdfi',
}
