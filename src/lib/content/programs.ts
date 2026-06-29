import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { paginateItems } from '@/lib/content/pagination'
import { filterCollection } from '@/lib/content/filter'
import { Program } from './types'
import { CONTENT_LIMITS } from '@/lib/content/pagination'

type ProgramsSearchParams = {
  [key: string]: string | string[] | undefined
}

function getParam(params: ProgramsSearchParams, key: string) {
  return typeof params[key] === 'string' ? (params[key] as string) : undefined
}

function byRecency(a: Program, b: Program) {
  const aTime = a.date ? new Date(a.date).getTime() : 0
  const bTime = b.date ? new Date(b.date).getTime() : 0
  return bTime - aTime
}

export function getRecentPrograms(limit = 5): Program[] {
  const all = getCollectionMarkdownData<Omit<Program, 'slug'>>('programs')
  return (all as Program[]).sort(byRecency).slice(0, limit)
}

/**
 * Shared by the page-1 route and /page/[page] route so filtering, pagination,
 * and query-string preservation stay in sync between them.
 */
export async function getPrograms(
  currentPage: number,
  searchParams: ProgramsSearchParams,
) {
  const allPrograms =
    getCollectionMarkdownData<Omit<Program, 'slug'>>('programs')

  const filteredPrograms = filterCollection<Program>(
    allPrograms,
    {
      q: getParam(searchParams, 'q'),
      category: getParam(searchParams, 'category'),
    },
    (program) => [program.status],
  ).sort(byRecency)

  const { items, totalPages } = paginateItems(
    filteredPrograms,
    currentPage,
    CONTENT_LIMITS.programs,
  )

  // Based on the full, unfiltered collection — lets callers tell "this page
  // segment doesn't exist" (404) apart from "this filter has no matches" (empty state).
  const maxPage = Math.max(
    1,
    Math.ceil(allPrograms.length / CONTENT_LIMITS.programs),
  )

  const queryBackup = new URLSearchParams()
  for (const key of ['q', 'category']) {
    const value = getParam(searchParams, key)
    if (value) queryBackup.set(key, value)
  }
  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return { items, totalPages, maxPage, querySuffix }
}
