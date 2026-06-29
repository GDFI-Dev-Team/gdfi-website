import { MetadataRoute } from 'next'
import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { ArticleContent } from '@/lib/content/types'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Pagination views left-out
const staticPaths = [
  '/',
  '/about-us/overview-history',
  '/about-us/mission-vision',
  '/about-us/organizational-structure',
  '/programs',
  '/research',
  '/resources/annual-reports',
  '/resources/video-resources',
  '/support-us',
  '/updates/announcements',
  '/updates/community-stories',
]

// Slug detail routes
const collections = [
  { subfolder: 'programs', basePath: '/programs' },
  { subfolder: 'updates/announcements', basePath: '/updates/announcements' },
  {
    subfolder: 'updates/community-stories',
    basePath: '/updates/community-stories',
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))

  const collectionEntries: MetadataRoute.Sitemap = collections.flatMap(
    ({ subfolder, basePath }) =>
      getCollectionMarkdownData<ArticleContent>(subfolder).map((item) => ({
        url: `${baseUrl}${basePath}/${item.slug}`,
        lastModified: item.date ? new Date(item.date) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
  )

  return [...staticEntries, ...collectionEntries]
}
