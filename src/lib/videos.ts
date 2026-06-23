import { getCollectionMarkdownData } from '@/lib/markdown'
import { paginateItems } from '@/lib/pagination'
import { filterAndSortCollection } from '@/lib/content-filter'
import { VideoContent } from '@/lib/interfaces/video'
import { CONTENT_LIMITS } from '@/config/content'

type SearchParams = {
  [key: string]: string | string[] | undefined
}

function getParam(params: SearchParams, key: string) {
  return typeof params[key] === 'string' ? (params[key] as string) : undefined
}

export function getAllVideos(): (VideoContent & { slug: string })[] {
  return getCollectionMarkdownData<VideoContent>('resources/videos')
}

export function getVideosPage(currentPage: number, searchParams: SearchParams) {
  const allVideos = getAllVideos()

  const filtered = filterAndSortCollection<VideoContent>(allVideos, {
    q: getParam(searchParams, 'q'),
    category: getParam(searchParams, 'category'),
    sort: getParam(searchParams, 'sort'),
    start_date: getParam(searchParams, 'start_date'),
    end_date: getParam(searchParams, 'end_date'),
  })

  const { items, totalPages } = paginateItems(
    filtered,
    currentPage,
    CONTENT_LIMITS.videos,
  )

  const maxPage = Math.max(
    1,
    Math.ceil(allVideos.length / CONTENT_LIMITS.videos),
  )

  const queryBackup = new URLSearchParams()
  for (const key of ['q', 'category', 'sort', 'start_date', 'end_date']) {
    const value = getParam(searchParams, key)
    if (value) queryBackup.set(key, value)
  }
  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return { items, totalPages, maxPage, querySuffix }
}
