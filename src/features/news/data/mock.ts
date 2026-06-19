export type NewsCategory = 'UPDATES' | 'INTERVIEWS' | 'COMMUNITY STORIES'

export interface ArticleImage {
  src: string
  caption?: string
}
export interface NewsArticle {
  id: string
  title: string
  content: string
  category: NewsCategory
  date: string
  images?: ArticleImage[]
  isVideo?: boolean
  duration?: string
  videoUrl?: string
}

export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title:
      '💻✨ GDFI Welcomes Tech Talents from University of the Philippines Tacloban! 🎓🌊',
    content: `The times are changing, and everything is going digital!\n\nFor an NGO like the Guiuan Development Foundation, Inc. (GDFI), keeping up with this shift is crucial.
    
    Spreading environmental awareness, showcasing community impact, and sharing our conservation stories now rely heavily on a strong digital presence.
    
    That is why—more than ever—the world of conservation needs the power of Computer Science! 🌐💡
    
    We are thrilled to officially welcome our student-trainees from the University of the Philippines Tacloban, pursuing their BS in Computer Science!
    
    These brilliant interns are taking on a massive role during their time with us: building GDFI’s official digital home.
    
    By bridging tech and environmental advocacy, these tech-for-good pioneers are equipping us with the modern tools we need to scale our operations, elevate our publicity, and amplify our awareness campaigns globally.
    
    This is a huge contribution to our mission. We are incredibly excited to see how their technical skills, codes, and algorithms will translate into stronger waves of coastal conservation and community resilience across Eastern Samar! 🐚💻
    
    Welcome to the team, UP Tacloban Interns!
    
    Let’s build a more digitally empowered and climate-resilient future together 🤝✨
    
    #GDFIxUPTacloban
    #TechForGood
    #ComputerScienceInConservation
    #DigitalTransformation
    #GDFI
    #UPTacloban
    #CoastalResilience
    #EasternSamar`,
    category: 'UPDATES',
    date: 'OCT 12, 2024',
    images: [
      {
        src: '/feat-hero/hero-1.webp',
        caption:
          'Volunteer divers inspecting the newly formed coral fragments. (Courtesy of GDFI Marine Team)',
      },
      {
        src: '/feat-hero/hero-2.webp',
        caption: 'Local fishers participating in the reef monitoring workshop.',
      },
      {
        src: '/feat-hero/hero-3.webp',
        caption:
          'A healthy patch of restored reef showing signs of returning marine life.',
      },
    ],
  },
  {
    id: 'news-2',
    title: 'Balancing Livelihoods and Conservation: A Community Perspective',
    content: `In this exclusive interview, we sit down with Maria Santos, a prominent community leader, to discuss the delicate balance between sustaining local fishing livelihoods and enforcing strict marine conservation policies.\n\nMaria shares her insights on how grassroots education and cooperative management are paving the way for a sustainable future. "It is not about stopping fishing," she explains, "it is about fishing smarter so our children can fish tomorrow."`,
    category: 'INTERVIEWS',
    date: 'OCT 05, 2024',
    images: [
      {
        src: '/feat-hero/hero-2.webp',
        caption: 'Maria Santos discussing conservation policies.',
      },
    ],
    isVideo: true,
    duration: '12:45',
    videoUrl: 'https://www.youtube.com/embed/TBg5-6JbOPk',
  },
  {
    id: 'news-3',
    title: 'Youth Volunteers Plant 5,000 Mangroves in Weekend Drive',
    content: `Local high school students joined our coastal resilience team to establish a new mangrove buffer zone. Over the course of two days, over 5,000 saplings were planted along the vulnerable shorelines. These mangroves will serve as a critical natural barrier against storm surges and provide a nursery for juvenile fish.`,
    category: 'COMMUNITY STORIES',
    date: 'SEP 28, 2024',
    images: [
      {
        src: '/feat-hero/hero-3.webp',
        caption: 'Youth volunteers planting mangrove saplings.',
      },
    ],
  },
  {
    id: 'news-4',
    title: 'New Marine Protected Area Designations Finalized',
    content: `Following months of consultation, local authorities have officially declared thr...`,
    category: 'UPDATES',
    date: 'SEP 15, 2024',
    images: [
      {
        src: '/updates-images/sample1.webp',
        caption: 'New Marine Protected Area Designations Finalized.',
      },
    ],
  },
  {
    id: 'news-5',
    title: 'The Science of Seagrass Carbon Sinks',
    content: `Interview with Dr. Aris Del Rosario, Lead Researcher`,
    category: 'INTERVIEWS',
    date: 'AUG 30, 2024',
    images: [
      {
        src: '/updates-images/sample2.webp',
        caption: 'Dr. Aris Del Rosario discussing seagrass carbon sinks.',
      },
    ],
    isVideo: true,
    duration: '08:30',
  },
  {
    id: 'news-6',
    title: 'Townhall Discussions Pave Way for Sustainable Fishing...',
    content: `A recap of the recent dialogs between local government units and fisherfolk...`,
    category: 'COMMUNITY STORIES',
    date: 'AUG 12, 2024',
    images: [
      {
        src: '/updates-images/sample3.webp',
        caption: 'Community members discussing sustainable fishing practices.',
      },
    ],
  },
]
