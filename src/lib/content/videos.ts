import { getCollectionMarkdownData } from '@/lib/content/markdown'
import { paginateItems } from '@/lib/content/pagination'
import { filterCollection } from '@/lib/content/filter'
import { VideoContent } from '@/lib/content/types'
import { CONTENT_LIMITS } from '@/lib/content/pagination'

type SearchParams = {
  [key: string]: string | string[] | undefined
}

function getParam(params: SearchParams, key: string) {
  return typeof params[key] === 'string' ? (params[key] as string) : undefined
}

export function getAllVideos(): (VideoContent & { slug: string })[] {
  return getCollectionMarkdownData<VideoContent>('resources/video-resources')
}

export function getVideosPage(currentPage: number, searchParams: SearchParams) {
  const allVideos = getAllVideos()

  const filtered = filterCollection<VideoContent>(allVideos, {
    q: getParam(searchParams, 'q'),
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
  for (const key of ['q']) {
    const value = getParam(searchParams, key)
    if (value) queryBackup.set(key, value)
  }
  const querySuffix = queryBackup.toString() ? `?${queryBackup.toString()}` : ''

  return { items, totalPages, maxPage, querySuffix }
}
