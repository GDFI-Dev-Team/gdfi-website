import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ExternalLink } from 'lucide-react'
import {
  getSingleMarkdownData,
  getCollectionMarkdownData,
} from '@/lib/markdown'
import { formatEdgeDate } from '@/lib/date'
import { VideoContent } from '@/lib/interfaces/video'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'

function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return m ? m[1] : null
}

export function generateStaticParams() {
  const videos = getCollectionMarkdownData<VideoContent>('resources/videos')
  return videos.map((video) => ({ slug: video.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function VideoResourcesSlugPage({ params }: PageProps) {
  const { slug } = await params

  let video: VideoContent
  try {
    video = getSingleMarkdownData<VideoContent>(
      'resources/videos',
      `${slug}.md`,
    )
  } catch {
    notFound()
  }

  const videoId = getYouTubeId(video.url)
  const embedSrc = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0`
    : null

  const displayTags = (video.tags ?? []).filter(
    (t) => t.toLowerCase() !== 'featured',
  )

  return (
    <main className="flex-1 flex flex-col bg-background pt-24 md:pt-32">
      <Section maxWidth="4xl" sectionClassName="py-8 md:py-12">
        <div className="mb-8">
          <Link href="/resources/videos" className="inline-flex">
            <Button
              variant="ghost"
              className="gap-2 px-0 hover:bg-transparent hover:text-btn-primary"
            >
              <ChevronLeft size={18} aria-hidden="true" />
              Back to Videos
            </Button>
          </Link>
        </div>

        <header className="flex flex-col gap-4 mb-8">
          <Heading level={1} className="text-balance leading-tight">
            {video.title}
          </Heading>

          <div className="flex flex-wrap items-center gap-3 text-foreground/60 mt-2">
            <Text size="sm" className="font-medium">
              {formatEdgeDate(video.date)}
            </Text>
            {displayTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {embedSrc ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg bg-black mb-8">
            <iframe
              src={embedSrc}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="flex justify-start mb-8">
            <Link href={video.url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="gap-2">
                Watch on YouTube <ExternalLink size={16} aria-hidden="true" />
              </Button>
            </Link>
          </div>
        )}

        {video.body && (
          <article className="flex flex-col gap-6">
            <Text
              size="lg"
              className="leading-relaxed text-foreground/90 whitespace-pre-line"
            >
              {video.body}
            </Text>
          </article>
        )}
      </Section>
    </main>
  )
}
