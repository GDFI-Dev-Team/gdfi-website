import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* Compact count for engagement numbers, e.g. 2400 → "2.4K" */
export function formatCount(count: number) {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(count)
}
