export type NavLink = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

/* Primary navigation. Give any item a `children` array to turn it into a dropdown (desktop) / accordion (mobile) */
export const navLinks: NavLink[] = [
  {
    label: 'About Us',
    href: '/about-us/overview-and-history',
    children: [
      {
        label: 'Overview & History',
        href: '/about-us/overview-and-history',
      },
      {
        label: 'Mission, Vision & Core Values',
        href: '/about-us/mission-vision-and-core-values',
      },
      {
        label: 'Organizational Structure',
        href: '/about-us/organizational-structure',
      },
    ],
  },
  {
    label: 'Our Works',
    href: '/our-works/programs-and-projects',
    children: [
      {
        label: 'Core Programs & Projects',
        href: '/our-works/programs-and-projects',
      },
      {
        label: 'Marine Protected Areas (MPAs)',
        href: '/our-works/marine-protected-areas',
      },
    ],
  },
  {
    label: 'Updates',
    href: '/updates/announcements',
    children: [
      { label: 'Announcements', href: '/updates/announcements' },
      { label: 'Community Stories', href: '/updates/community-stories' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources/research-and-publications',
    children: [
      {
        label: 'Research & Publications',
        href: '/resources/research-and-publications',
      },
      {
        label: 'Annual & Financial Reports',
        href: '/resources/annual-and-financial-reports',
      },
      {
        label: 'Video & Media Resources',
        href: '/resources/video-and-media-resources',
      },
    ],
  },
]

/**
 * Organization details — single source of truth for contact info shown in
 * the footer (and reusable elsewhere). Adjust `founded` / `about` as needed.
 */
export const org = {
  name: 'Guiuan Development Foundation, Inc.',
  shortName: 'GDFI',
  founded: 1988,
  email: 'hello.gdfi@gmail.com',
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
