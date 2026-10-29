import { Metadata } from 'next'
import { ArticleContent } from '@/lib/content/types'
import { toPlainText } from '@/lib/content/markdown'
import { SITE_NAME, TITLE_TEMPLATE } from './site'

/**
 * Default share image. Social images must be JPG/PNG at 1200x630 — Facebook's
 * scraper doesn't reliably render WebP, so the WebP page banners can't be used.
 */
export const DEFAULT_OG_IMAGE = '/og/default.jpg'

/**
 * Open Graph fields every page needs. A child `openGraph` object REPLACES the
 * parent's entirely (no deep merge), so each builder spreads these back in.
 */
export const baseOpenGraph = {
  siteName: SITE_NAME,
  locale: 'en_PH',
  type: 'website',
} as const

/**
 * Title as `{ default, template }` rather than a plain string: a plain string
 * resets the inherited template, which drops the site-name suffix on every
 * child route (e.g. individual announcements).
 */
function templatedTitle(title: string) {
  return { default: title, template: TITLE_TEMPLATE }
}

/** Trims to `max` characters at a word boundary, adding an ellipsis. */
export function truncateAtWord(text: string, max = 160): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:!?—-]+$/, '')}…`
}

/**
 * Builds metadata (title, description, canonical, Open Graph) for a static
 * page or section layout. Twitter tags are left unset on purpose: Next fills
 * them from the resolved Open Graph values, site-name suffix included.
 *
 * @param path  The page's root-relative path (e.g. `/get-involved`).
 * @param image A 1200x630 JPG under `/og/`.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  return {
    title: templatedTitle(title),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      title: templatedTitle(title),
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
  }
}

/**
 * Canonical + title for page N of a paginated list. Page 1 (`/page/1`)
 * canonicalizes to the list's base path; later pages point to themselves so
 * Google keeps crawling them.
 */
export function buildPaginatedMetadata(
  basePath: string,
  sectionTitle: string,
  page: string,
): Metadata {
  const pageNumber = Number(page)
  if (!Number.isInteger(pageNumber) || pageNumber <= 1) {
    return { alternates: { canonical: basePath } }
  }

  return {
    title: `${sectionTitle} – Page ${pageNumber}`,
    alternates: { canonical: `${basePath}/page/${pageNumber}` },
  }
}

/** Plain-text summary of an article: its excerpt, or the start of its body. */
export function getArticleDescription(article: ArticleContent): string {
  return truncateAtWord(
    article.excerpt?.trim() || toPlainText(article.body),
    160,
  )
}

/**
 * Builds dynamic, per-article SEO metadata (title, description, canonical,
 * Open Graph) for an editorial detail page. Twitter tags are filled from
 * Open Graph by Next.js.
 *
 * @param article       The parsed article front matter + body.
 * @param path          The page's absolute path (e.g. `/updates/announcements/my-slug`).
 * @param fallbackImage Image used when the article has no featured_images —
 *                      typically the parent route's `/og/` image.
 */
export function buildArticleMetadata(
  article: ArticleContent,
  path: string,
  fallbackImage: string,
): Metadata {
  const { title, featured_images, author, date } = article

  const description = getArticleDescription(article)
  const image = featured_images?.[0] || fallbackImage
  const authorName = author?.trim() || undefined

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      type: 'article',
      title,
      description,
      url: path,
      images: [{ url: image, alt: title }],
      publishedTime: date ? new Date(date).toISOString() : undefined,
      authors: authorName ? [authorName] : undefined,
    },
  }
}
