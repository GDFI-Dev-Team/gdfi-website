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
export function downloadPDF(url: string, filename?: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename ?? 'download.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Consolidated next and prev pagination handlers
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
