export interface BreadcrumbItem {
  label: string
  href: string
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

  let currentPath = ''
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`
    const segment = segments[i]

    breadcrumbs.push({
      label: segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      href: currentPath,
    })
  }
  return breadcrumbs
}
