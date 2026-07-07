import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { paginateItems } from '@/lib/content/pagination'
import { filterCollection } from '@/lib/content/filter'
import { Program } from './types'
import { CONTENT_LIMITS } from '@/lib/content/pagination'

type NamedEntry = { name: string }

/** Sorted, deduped list of names from a small name-only relation collection. */
function getNames(subfolder: string): string[] {
  return getCollectionMarkdownData<NamedEntry>(subfolder)
    .map((entry) => entry.name)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
}

/** Program tag options — maintained in the CMS `program-categories` collection. */
export function getProgramCategories(): string[] {
  return getNames('our-works/program-categories')
}

/** Program status options — maintained in the CMS `program-statuses` collection. */
export function getProgramStatuses(): string[] {
  return getNames('our-works/program-statuses')
}

type ProgramsSearchParams = {
  [key: string]: string | string[] | undefined
}

const STATUS_STYLES: Record<string, string> = {
  completed: 'bg-status-completed',
  active: 'bg-status-ongoing',
  discontinued: 'bg-status-discontinued',
  'on going': 'bg-status-discontinued',
}

/** Role-token background class for a program's status pill. */
export function statusClass(status: string): string {
  return STATUS_STYLES[status.toLowerCase()] ?? 'bg-primary-600'
}

function getParam(params: ProgramsSearchParams, key: string) {
  return typeof params[key] === 'string' ? (params[key] as string) : undefined
}

function byTitle(a: Program, b: Program) {
  return a.title.localeCompare(b.title)
}

/**
 * Programs flagged `featured: true` in the CMS — drives the homepage hero
 * slideshow. Falls back to all programs if none are flagged, so the hero is
 * never empty. Ordered alphabetically by title, capped at `limit`.
 */
export function getFeaturedPrograms(limit = 5): Program[] {
  const all = getCollectionMarkdownData<Omit<Program, 'slug'>>(
    'our-works/programs-and-projects',
  ) as Program[]

  const featured = all.filter((program) => program.featured).sort(byTitle)

  return (featured.length > 0 ? featured : all.sort(byTitle)).slice(0, limit)
}

/**
 * Shared by the page-1 route and /page/[page] route so filtering, pagination,
 * and query-string preservation stay in sync between them.
 */
export async function getPrograms(
  currentPage: number,
  searchParams: ProgramsSearchParams,
) {
  const allPrograms = getCollectionMarkdownData<Omit<Program, 'slug'>>(
    'our-works/programs-and-projects',
  )

  // `category` filters by status; `tag` is a separate axis filtering by the
  // program's category pill. Status search-matching is handled by filterCollection.
  const tag = getParam(searchParams, 'tag')?.toLowerCase()

  const filteredPrograms = filterCollection<Program>(
    allPrograms,
    {
      q: getParam(searchParams, 'q'),
      category: getParam(searchParams, 'category'),
    },
    (program) => [program.status],
  )
    .filter((program) => !tag || program.tag?.toLowerCase() === tag)
    .sort(byTitle)

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
  for (const key of ['q', 'category', 'tag']) {
    const value = getParam(searchParams, key)
    if (value) queryBackup.set(key, value)
  }
  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return { items, totalPages, maxPage, querySuffix }
}
