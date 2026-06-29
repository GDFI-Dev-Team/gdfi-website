'use client'

import { generateBreadcrumbs } from '@/lib/navigation/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn-merge'

export default function Breadcrumbs({
  last,
  className,
}: {
  last: string
  /** Override visibility / text size, e.g. "block text-xs md:text-sm". */
  className?: string
}) {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'hidden text-sm text-text-subtle transition-colors duration-300 ease-[ease] md:block',
        className,
      )}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <li key={breadcrumb.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-text-standard"
                >
                  {last}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="transition-colors hover:text-text-standard"
                >
                  {breadcrumb.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  size={14}
                  className="text-text-faint"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
