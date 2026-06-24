// General utility class
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Classnames safe merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
