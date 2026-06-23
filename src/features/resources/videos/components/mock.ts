export interface VideoResource {
  id: string
  title: string
  description: string
  date: string
  duration: string
  videoUrl: string
  thumbnail: string
}

export const mockVideos: VideoResource[] = [
  {
    id: 'vid-1',
    title: 'Ridge to Reef: The Eastern Samar Conservation Story',
    description:
      'A comprehensive documentary exploring the interconnected ecosystems of Eastern Samar. Follow our field researchers as they track the impact of upland reforestation on coastal marine sanctuaries.',
    date: 'NOV 15, 2024',
    duration: '45:20',
    videoUrl: 'https://www.youtube.com/embed/TBg5-6JbOPk',
    thumbnail: '/feat-hero/hero-1.webp',
  },
  {
    id: 'vid-2',
    title: 'Community-Based Coastal Resource Management Workshop',
    description:
      'Full recording of the Q3 2024 webinar discussing new zoning laws, sustainable fishing practices, and the role of local government units in enforcing marine protected areas.',
    date: 'OCT 22, 2024',
    duration: '1:12:05',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    thumbnail: '/feat-hero/hero-2.webp',
  },
  {
    id: 'vid-3',
    title: 'Voices from the Coast: Maria Santos',
    description:
      'An in-depth interview with community leader Maria Santos on how grassroots education and cooperative management are paving the way for a sustainable future in her municipality.',
    date: 'SEP 05, 2024',
    duration: '12:45',
    videoUrl: 'https://www.youtube.com/embed/TBg5-6JbOPk',
    thumbnail: '/feat-hero/hero-3.webp',
  },
  {
    id: 'vid-4',
    title: 'How to Conduct a Fish Visual Census',
    description:
      'A step-by-step training video for our new pool of volunteers. Learn the standard protocols for identifying and counting fish species along a transect line.',
    date: 'AUG 18, 2024',
    duration: '18:30',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    thumbnail: '/updates-images/sample1.webp',
  },
]
