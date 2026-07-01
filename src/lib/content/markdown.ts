import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

/**
 * Reads and parses any individual Markdown file dynamically.
 * @template T The TypeScript interface matching the page's front matter schema.
 * @param subfolder The directory inside /content
 * @param fileName The exact file name with extension (e.g., 'mission-vision.md').
 */
export function getSingleMarkdownData<T>(
  subfolder: string,
  fileName: string,
): T {
  const filePath = path.join(process.cwd(), 'content', subfolder, fileName)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Markdown file not found at path: ${filePath}`)
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return { ...data, body: content } as T
}
/**
 * Reads, parses, and gathers an entire directory of Markdown files
 */
export function getCollectionMarkdownData<T>(
  subfolder: string,
): (T & { slug: string })[] {
  const directoryPath = path.join(process.cwd(), 'content', subfolder)

  if (!fs.existsSync(directoryPath)) return []

  const fileNames = fs.readdirSync(directoryPath)

  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(directoryPath, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        ...(data as T),
        body: content,
      }
    })
}

/**
 * Renders a Markdown body to HTML for prose rendering on detail pages. Server
 * only — call it inside a Server Component and pass the result to
 * `<ArticleDetail bodyHtml=... />`.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(html).process(markdown)
  return processed.toString()
}

/**
 * Strips Markdown syntax down to a continuous plain-text string, for card
 * previews and meta descriptions where raw `#`/`**` markup must not leak
 * through. Block structure is flattened to spaces (CSS line-clamp handles the
 * visual truncation), so this is intentionally lossy.
 */
export function toPlainText(markdown: string | undefined | null): string {
  if (!markdown) return ''

  return markdown
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> keep label
    .replace(/^\s{0,3}#{1,6}\s+/gm, '') // headings
    .replace(/^\s{0,3}>\s?/gm, '') // blockquotes
    .replace(/^\s{0,3}(?:[-*+]|\d+\.)\s+/gm, '') // list markers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // italic
    .replace(/~~(.*?)~~/g, '$1') // strikethrough
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim()
}
