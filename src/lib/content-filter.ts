import { BaseContent } from '@/lib/interfaces/content'

interface UniversalFilterParams {
  q?: string
  category?: string
  sort?: string
  start_date?: string
  end_date?: string
}

type FilterableContent = BaseContent & {
  date?: string
  tags?: string[]
  body?: string
}

export function filterAndSortCollection<T extends FilterableContent>( // typescript generic T
  items: T[],
  params: UniversalFilterParams,
  // Callback function to handle varying tag property names across content types
  getTagList: (item: T) => string[] = (item) => item.tags || [],
): T[] {
  let filtered = [...items]

  if (params.q) {
    // text search
    const query = params.q.toLowerCase().trim()
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.body?.toLowerCase().includes(query) ?? false) ||
        getTagList(item).some((t) => t.toLowerCase().includes(query)),
    )
  }

  if (params.category && params.category !== 'all') {
    // category selection
    const categoryLower = params.category.toLowerCase()
    filtered = filtered.filter((item) =>
      getTagList(item).some((t) => t.toLowerCase() === categoryLower),
    )
  }

  if (params.start_date) {
    // date tracking range
    const start = new Date(params.start_date).getTime()
    filtered = filtered.filter(
      (item) =>
        item.date !== undefined && new Date(item.date).getTime() >= start,
    )
  }
  if (params.end_date) {
    const end = new Date(params.end_date).getTime()
    filtered = filtered.filter(
      (item) => item.date !== undefined && new Date(item.date).getTime() <= end,
    )
  }

  filtered.sort((a, b) => {
    // timeline sorting — items without a date keep their relative order
    const timeA = a.date ? new Date(a.date).getTime() : 0
    const timeB = b.date ? new Date(b.date).getTime() : 0
    return params.sort === 'oldest' ? timeA - timeB : timeB - timeA
  })

  return filtered
}
