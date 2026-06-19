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
    date: '5 JUNE 2026',
    images: [
      {
        src: '/updates-images/sample2.webp',
        caption:
          'Group photo of the UP Tacloban interns with GDFI staff and volunteers.',
      },
      {
        src: '/updates-images/sample3.webp',
        caption: 'Presentation of the proposed website interface.',
      },
      {
        src: '/updates-images/sample4.webp',
        caption:
          'Audience members engaging with the presentation and asking questions.',
      },
      {
        src: '/updates-images/sample5.webp',
        caption: 'UP Tacloban students and GDFI staff discussing the project.',
      },
      {
        src: '/updates-images/sample6.webp',
      },
      {
        src: '/updates-images/sample7.webp',
      },
    ],
  },
  {
    id: 'news-2',
    title: `Fisher Voices : The Struggles of Public Market Fish Vendors in Guiuan, Eastern Samar`,
    content: `The story focuses on two women fish vendors (Ms. Concordia Gayoso and Ms. Rowena Sawaan) of more than 30 years at the Guiuan Public Market. Their livelihood is threatened by the continuous decrease in fish supply, decreasing variety of species and sizes. Abrupt weather change was identified as one of the main reasons for the low fish supply in the market. The increasing price from middlemen was also highlighted by the vendors as this requires them to have bigger capital.`,
    category: 'INTERVIEWS',
    date: '25 October 2024',
    images: [
      {
        src: '/thumbnails/thumbnail-1.webp',
        caption: 'Ms. Concordia Gayoso engaging in an interview.',
      },
    ],
    isVideo: true,
    duration: '2:27',
    videoUrl: 'https://www.youtube.com/embed/TBg5-6JbOPk',
  },
  {
    id: 'news-3',
    title: 'Youth Volunteers Plant 5,000 Mangroves in Weekend Drive',
    content: `Local high school students joined our coastal resilience team to establish a new mangrove buffer zone. Over the course of two days, over 5,000 saplings were planted along the vulnerable shorelines. These mangroves will serve as a critical natural barrier against storm surges and provide a nursery for juvenile fish.`,
    category: 'COMMUNITY STORIES',
    date: '28 September 2024',
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
    date: '15 September 2024',
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
    date: '30 August 2024',
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
    date: '12 August 2024',
    images: [
      {
        src: '/updates-images/sample3.webp',
        caption: 'Community members discussing sustainable fishing practices.',
      },
    ],
  },
]
