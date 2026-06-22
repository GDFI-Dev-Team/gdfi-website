// src/lib/utils/markdown.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
