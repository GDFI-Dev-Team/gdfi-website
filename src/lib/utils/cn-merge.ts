import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Classnames safe merging with twMerge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
