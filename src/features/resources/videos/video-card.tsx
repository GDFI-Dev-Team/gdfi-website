import Image from 'next/image'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { Play } from 'lucide-react'
import { VideoContent } from '@/lib/interfaces/video'
import { formatEdgeDate } from '@/lib/date'

function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  return m ? m[1] : null
}

export default function VideoCard({ video }: { video: VideoContent }) {
  const videoId = getYouTubeId(video.url)
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null

  const displayTags = (video.tags ?? []).filter(
    (t) => t.toLowerCase() !== 'featured',
  )

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Thumbnail — links to YouTube externally */}
      <Link
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-video w-full overflow-hidden block bg-foreground/5"
        aria-label={`Watch "${video.title}" on YouTube`}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
            <Play className="text-foreground/30" size={40} />
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm ring-2 ring-white/20 transition-transform duration-300 group-hover:scale-110">
            <Play className="fill-white text-white ml-0.5" size={20} />
          </div>
        </div>
      </Link>

      {/* Meta & text */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {displayTags.length > 0 ? (
              displayTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300">
                Video
              </span>
            )}
          </div>
          <Text
            size="xs"
            className="text-foreground/50 font-semibold tracking-wider shrink-0"
          >
            {formatEdgeDate(video.date)}
          </Text>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <Heading level={4} className="line-clamp-2 leading-snug">
            {video.title}
          </Heading>
          {(video.excerpt && (
            <Text size="sm" className="text-foreground/60 line-clamp-3">
              {video.excerpt}
            </Text>
          )) ||
            (video.body && (
              <Text size="sm" className="text-foreground/60 line-clamp-3">
                {video.body}
              </Text>
            ))}
        </div>
      </div>
    </article>
  )
}
