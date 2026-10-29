import { org, socials } from '@/lib/navigation/nav'
import { ArticleContent, VideoContent } from '@/lib/content/types'
import { getYouTubeId } from '@/lib/utils/youtube'
import { SITE_NAME, absoluteUrl, siteUrl } from './site'

type JsonLdData = Record<string, unknown> | Record<string, unknown>[]

/**
 * Renders schema.org structured data. `<` is escaped so content can't close
 * the script tag early.
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

const LOGO_URL = absoluteUrl('/logo-images/logo.svg')
const ORGANIZATION_ID = `${siteUrl}/#organization`

/** Site-wide NGO entity. Rendered once in the root layout. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': ORGANIZATION_ID,
    name: org.name,
    alternateName: [org.shortName, SITE_NAME],
    url: siteUrl,
    logo: LOGO_URL,
    description: org.about,
    foundingDate: String(org.founded),
    email: org.email,
    address: {
      '@type': 'PostalAddress',
      ...org.postalAddress,
    },
    sameAs: Object.values(socials),
  }
}

/**
 * Article / NewsArticle entity for an editorial detail page. `description` is
 * passed in (see `getArticleDescription`) so this module stays free of the
 * markdown/content imports and safe to use from client components.
 */
export function articleJsonLd(
  article: ArticleContent,
  path: string,
  description: string,
  type: 'Article' | 'NewsArticle' = 'Article',
) {
  const url = absoluteUrl(path)
  const authorName = article.author?.trim()

  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: article.title,
    description,
    url,
    mainEntityOfPage: url,
    image: article.featured_images?.length
      ? article.featured_images.map(absoluteUrl)
      : undefined,
    datePublished: article.date
      ? new Date(article.date).toISOString()
      : undefined,
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
  }
}

/** BreadcrumbList mirroring the visible breadcrumb trail. */
export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  }
}

/** VideoObject entities for YouTube-hosted videos. */
export function videosJsonLd(videos: VideoContent[]) {
  return videos.flatMap((video) => {
    const id = getYouTubeId(video['youtube-link'])
    if (!id) return []

    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.title,
      description: video.body?.trim() || video.title,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      uploadDate: new Date(video.date).toISOString(),
      embedUrl: `https://www.youtube.com/embed/${id}`,
      url: video['youtube-link'],
    }
  })
}
