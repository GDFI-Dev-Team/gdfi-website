export type Story = {
  slug: string
  title: string
  subtitle: string
  image: string
  datePublished: string
  /* Temporary engagement numbers until stories come from a CMS/API */
  views: number
  likes: number
}

export const stories: Story[] = [
  {
    slug: 'fisher-stories',
    title: 'Fisher Stories',
    subtitle: 'Meet the fishers of Eastern Samar, Philippines',
    image: '/stories-images/fisher-stories.png',
    datePublished: 'February 2022',
    views: 2400,
    likes: 186,
  },
  {
    slug: 'women-fishers',
    title: 'Women Fishers',
    subtitle:
      'Read the stories of the women of fishing villages in Samar, Philippines',
    image: '/stories-images/women-fishers.png',
    datePublished: 'March 2022',
    views: 1850,
    likes: 142,
  },
]
