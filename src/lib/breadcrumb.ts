export interface BreadcrumbItem {
  label: string
  href: string
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

  let currentPath = ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]

    // Pagination segments (e.g. /page/2) aren't a real navigable level
    if (segment === 'page') break

    currentPath += `/${segment}`

    breadcrumbs.push({
      label: segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      href: currentPath,
    })
  }
  return breadcrumbs
}
