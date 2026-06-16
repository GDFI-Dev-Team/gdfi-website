import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* Compact count for engagement numbers, e.g. 2400 → "2.4K" */
export function formatCount(count: number) {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(count)
}

// Source - https://stackoverflow.com/q/78099865
// Posted by Haroon Ahmed, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-16, License - CC BY-SA 4.0

export function downloadPDF(url: string, filename?: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename ?? 'download.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function handlePagination(
  direction: 'next' | 'prev',
  setPageNumber: (updater: (p: number) => number) => void,
  numPages: number | null,
) {
  if (direction === 'next') {
    setPageNumber((p) => Math.min(numPages ?? p, p + 1))
  } else {
    setPageNumber((p) => Math.max(1, p - 1))
  }
}
