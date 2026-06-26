// Estimates reading time for article body content.

const WORDS_PER_MINUTE = 200

/**
 * Counts the words in a string, ignoring markdown syntax and extra whitespace.
 */
function countWords(content: string | undefined | null): number {
  if (!content) return 0

  const plainText = content
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links/images -> keep label
    .replace(/[#>*_~`-]/g, ' ') // residual markdown punctuation

  const words = plainText.trim().match(/\S+/g)
  return words ? words.length : 0
}

/**
 * Returns the estimated reading time in whole minutes (minimum 1).
 */
export function getReadingTime(content: string | undefined | null): number {
  const wordCount = countWords(content)
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

/**
 * Returns a display-ready reading time label, e.g. "3 min read".
 */
export function formatReadingTime(content: string | undefined | null): string {
  return `${getReadingTime(content)} min read`
}
