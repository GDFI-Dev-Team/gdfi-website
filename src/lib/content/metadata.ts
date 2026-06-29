import { Metadata } from 'next'
import { ArticleContent } from './types'

/**
 * Builds dynamic, per-article SEO metadata (title, description, canonical,
 * Open Graph, Twitter) for an editorial detail page.
 *
 * @param article       The parsed article front matter + body.
 * @param path          The page's absolute path (e.g. `/updates/announcements/my-slug`).
 * @param fallbackImage Image used when the article has no featured_images —
 *                      typically the parent route's banner.
 */
export function buildArticleMetadata(
  article: ArticleContent,
  path: string,
  fallbackImage: string,
): Metadata {
  const { title, excerpt, body, featured_images, author, date } = article

  // Many articles have an empty excerpt — fall back to the start of the body.
  const description = excerpt?.trim() || body.trim().slice(0, 160)
  const image = featured_images?.[0] || fallbackImage
  const authorName = author?.trim() || undefined

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title,
      description,
      url: path,
      images: [{ url: image, alt: title }],
      publishedTime: date ? new Date(date).toISOString() : undefined,
      authors: authorName ? [authorName] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
