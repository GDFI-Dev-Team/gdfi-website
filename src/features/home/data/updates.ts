export type Update = {
  slug: string
  title: string
  date: string
  image: string
  /* Temporary engagement numbers until updates come from a CMS/API */
  views: number
  likes: number
  readMinutes: number
}

/* Newest first — the first entry renders as the featured card */
export const updates: Update[] = [
  {
    slug: 'sample2',
    title:
      'GDFI Welcomes Tech Talents from University of the Philippines Tacloban!',
    date: 'June 5, 2026',
    image: '/updates-images/sample2.jpg',
    views: 1240,
    likes: 98,
    readMinutes: 4,
  },
  {
    slug: 'sample1',
    title: '7 Municipalities, 1 Shared Vision for Our Coasts!',
    date: 'May 28, 2026',
    image: '/updates-images/sample1.jpg',
    views: 3100,
    likes: 215,
    readMinutes: 6,
  },
  {
    slug: 'sample3',
    title: 'LIVE: Breaking down the "Power of Three"',
    date: 'May 11, 2026',
    image: '/updates-images/sample3.jpg',
    views: 980,
    likes: 64,
    readMinutes: 3,
  },
  {
    slug: 'sample4',
    title: 'To the Guardians of our Coasts: Happy Mother’s Day!',
    date: 'May 10, 2026',
    image: '/updates-images/sample4.jpg',
    views: 1670,
    likes: 188,
    readMinutes: 2,
  },
  {
    slug: 'sample5',
    title: 'Building resilience for our coastal communities!',
    date: 'May 6, 2026',
    image: '/updates-images/sample5.jpg',
    views: 2050,
    likes: 121,
    readMinutes: 5,
  },
]
