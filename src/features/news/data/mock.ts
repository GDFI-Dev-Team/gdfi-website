export type NewsCategory = 'UPDATES' | 'INTERVIEWS' | 'COMMUNITY STORIES'

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: NewsCategory
  date: string
  image: string
  isVideo?: boolean
  duration?: string
}

export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Coral Reef Restoration Initiative Yields Promising...',
    excerpt:
      'Recent surveys along the southern coast show a 15% increase in viable...',
    category: 'UPDATES',
    date: 'OCT 12, 2024',
    image: '/feat-hero/hero-1.webp',
  },
  {
    id: 'news-2',
    title: 'Balancing Livelihoods and Conservation',
    excerpt: 'Interview with Maria Santos, Community Leader',
    category: 'INTERVIEWS',
    date: 'OCT 05, 2024',
    image: '/feat-hero/hero-2.webp',
    isVideo: true,
    duration: '12:45',
  },
  {
    id: 'news-3',
    title: 'Youth Volunteers Plant 5,000 Mangroves in Weekend Drive',
    excerpt:
      'Local high school students joined our coastal resilience team to establish a...',
    category: 'COMMUNITY STORIES',
    date: 'SEP 28, 2024',
    image: '/feat-hero/hero-3.webp',
  },
  {
    id: 'news-4',
    title: 'New Marine Protected Area Designations Finalized',
    excerpt:
      'Following months of consultation, local authorities have officially declared thr...',
    category: 'UPDATES',
    date: 'SEP 15, 2024',
    image: '/updates-images/sample1.webp',
  },
  {
    id: 'news-5',
    title: 'The Science of Seagrass Carbon Sinks',
    excerpt: 'Interview with Dr. Aris Del Rosario, Lead Researcher',
    category: 'INTERVIEWS',
    date: 'AUG 30, 2024',
    image: '/updates-images/sample2.webp',
    isVideo: true,
    duration: '08:30',
  },
  {
    id: 'news-6',
    title: 'Townhall Discussions Pave Way for Sustainable Fishing...',
    excerpt:
      'A recap of the recent dialogs between local government units and fisherfolk...',
    category: 'COMMUNITY STORIES',
    date: 'AUG 12, 2024',
    image: '/updates-images/sample3.webp',
  },
]
