import React from 'react'
import { cn } from '../../lib/utils'

interface HeadingProps {
  level?: 1 | 2 | 3
  children: React.ReactNode
  className?: string
  id?: string
}

const headingStyles = {
  1: 'text-3xl md:text-4xl lg:text-6xl font-bold leading-relaxed',
  2: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed',
  3: 'text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed',
}

export default function Heading({
  level = 1,
  children,
  className,
  id,
}: HeadingProps) {
  const baseClasses = headingStyles[level]
  const combinedClasses = cn(baseClasses, className)

  const HeadingTag = `h${level}`

  return React.createElement(
    HeadingTag,
    { className: combinedClasses, id },
    children,
  )
}
