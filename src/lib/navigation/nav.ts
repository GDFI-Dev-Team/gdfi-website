export type NavLink = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

/* Primary navigation. Give any item a `children` array to turn it into a dropdown (desktop) / accordion (mobile) */
export const navLinks: NavLink[] = [
  {
    label: 'About Us',
    href: '/about-us/our-purpose',
    children: [
      {
        label: 'Our Purpose',
        href: '/about-us/our-purpose',
      },
      {
        label: 'Overview & History',
        href: '/about-us/overview-history',
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
        href: '/our-works/mpas',
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
        label: 'Research and Publications',
        href: '/resources/research-and-publications',
      },
      {
        label: 'Annual & Financial Reports',
        href: '/resources/annual-reports',
      },
      { label: 'Videos & Media', href: '/resources/video-resources' },
    ],
  },
  { label: 'Awards & Recognitions', href: '/awards-and-recognitions' },
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
