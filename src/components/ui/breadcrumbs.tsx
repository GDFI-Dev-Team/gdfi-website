'use client'

import { generateBreadcrumbs } from '@/lib/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Banner({ last }: { last: string }) {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <nav aria-label="Breadcrumb" className="hidden md:block">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-foreground/60">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <li key={breadcrumb.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-foreground font-medium"
                >
                  {last}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="flex items-center hover:text-foreground transition-colors"
                >
                  {breadcrumb.label}
                  <ChevronRight size={15} />
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
