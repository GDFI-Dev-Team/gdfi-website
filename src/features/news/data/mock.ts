export type NewsCategory = 'UPDATES' | 'INTERVIEWS' | 'COMMUNITY STORIES'

export interface NewsArticle {
  id: string
  title: string
  content: string
  category: NewsCategory
  date: string
  image: string
  isVideo?: boolean
  duration?: string
}

export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title:
      'Coral Reef Restoration Initiative Yields Promising Results in Southern Coast',
    content:
      'Recent surveys along the southern coast show a 15% increase in viable coral fragments. This milestone comes after months of dedicated effort by local marine biologists and volunteer divers who have been carefully monitoring the artificial reef structures. The initiative aims to restore the natural habitat for various marine species, boosting both biodiversity and local ecotourism.',
    category: 'UPDATES',
    date: 'OCT 12, 2024',
    image: '/feat-hero/hero-1.webp',
  },
  {
    id: 'news-2',
    title: 'Balancing Livelihoods and Conservation: A Community Perspective',
    content:
      'In this exclusive interview, we sit down with Maria Santos, a prominent community leader, to discuss the delicate balance between sustaining local fishing livelihoods and enforcing strict marine conservation policies. Maria shares her insights on how grassroots education and cooperative management are paving the way for a sustainable future.',
    category: 'INTERVIEWS',
    date: 'OCT 05, 2024',
    image: '/feat-hero/hero-2.webp',
    isVideo: true,
    duration: '12:45',
  },
  {
    id: 'news-3',
    title: 'Youth Volunteers Plant 5,000 Mangroves in Weekend Drive',
    content:
      'Local high school students joined our coastal resilience team to establish a new mangrove buffer zone. Over the course of two days, over 5,000 saplings were planted along the vulnerable shorelines. These mangroves will serve as a critical natural barrier against storm surges and provide a nursery for juvenile fish.',
    category: 'COMMUNITY STORIES',
    date: 'SEP 28, 2024',
    image: '/feat-hero/hero-3.webp',
  },
  {
    id: 'news-4',
    title: 'New Marine Protected Area Designations Finalized',
    content:
      'Following months of consultation, local authorities have officially declared thr...',
    category: 'UPDATES',
    date: 'SEP 15, 2024',
    image: '/updates-images/sample1.webp',
  },
  {
    id: 'news-5',
    title: 'The Science of Seagrass Carbon Sinks',
    content: 'Interview with Dr. Aris Del Rosario, Lead Researcher',
    category: 'INTERVIEWS',
    date: 'AUG 30, 2024',
    image: '/updates-images/sample2.webp',
    isVideo: true,
    duration: '08:30',
  },
  {
    id: 'news-6',
    title: 'Townhall Discussions Pave Way for Sustainable Fishing...',
    content:
      'A recap of the recent dialogs between local government units and fisherfolk...',
    category: 'COMMUNITY STORIES',
    date: 'AUG 12, 2024',
    image: '/updates-images/sample3.webp',
  },
]
