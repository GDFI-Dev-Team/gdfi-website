import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import LikeButton from './like-button'
import { Eye, Clock } from 'lucide-react'
import { formatCount } from '@/lib/utils'
import { getAnnouncements } from '@/lib/data/announcements'
import { ArticleContent } from '@/lib/interfaces/content'
import { FALLBACK_IMAGE } from '@/config/content'
import { formatEdgeDate } from '@/lib/date'

type Announcement = ArticleContent

/* Stable placeholder engagement numbers until views/likes/read-time are wired to real data */
function placeholderStats(slug: string) {
  let hash = 0
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0

  return {
    views: 800 + (hash % 2200),
    likes: 50 + (hash % 450),
    readMinutes: 3 + (hash % 6),
  }
}

const UpdateMeta = ({ update }: { update: Announcement }) => {
  const { views, likes, readMinutes } = placeholderStats(update.slug)

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-overlay-subtle">
      <div className="inline-flex items-center gap-1.5">
        <Eye size={16} aria-hidden="true" />
        <Text size="sm">{formatCount(views)}</Text>
      </div>
      <LikeButton
        count={likes}
        className="text-on-overlay-subtle hover:text-on-overlay"
      />
      <div className="inline-flex items-center gap-1.5">
        <Clock size={16} aria-hidden="true" />
        <Text size="sm">{readMinutes} min read</Text>
      </div>
    </div>
  )
}

const UpdateCard = ({
  update,
  featured = false,
}: {
  update: Announcement
  featured?: boolean
}) => {
  const imageSrc = update.featured_images?.[0] || FALLBACK_IMAGE

  return (
    <article
      className={
        featured
          ? 'group relative overflow-hidden rounded-xl aspect-4/3 sm:aspect-21/9'
          : 'group relative overflow-hidden rounded-xl aspect-4/3 sm:aspect-4/5'
      }
    >
      <Link
        href={`/updates/announcements/${update.slug}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only ">Read {update.title}</span>
      </Link>
      <Image
        src={imageSrc}
        alt={update.slug}
        fill
        sizes={
          featured
            ? '(min-width: 1280px) 1280px, 100vw'
            : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
        }
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-overlay/90 via-overlay/45 to-overlay/10 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className={
          featured
            ? 'absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-10 pointer-events-none'
            : 'absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6 pointer-events-none'
        }
      >
        <Text
          size="xs"
          transform="uppercase"
          className="tracking-widest text-on-overlay-subtle"
        >
          {formatEdgeDate(update.date)}
        </Text>
        <Heading
          level={featured ? 3 : 4}
          className={
            featured
              ? 'max-w-2xl text-on-overlay'
              : 'line-clamp-2 text-on-overlay'
          }
        >
          {update.title}
        </Heading>
        <div className="pointer-events-auto">
          <UpdateMeta update={update} />
        </div>
      </div>
    </article>
  )
}

export default async function OurLatestUpdates() {
  const { items } = await getAnnouncements(1, {})
  const updates = items.slice(0, 5)
  const [featured, ...rest] = updates

  if (!featured) return null

  return (
    <Section
      aria-labelledby="our-latest-updates-heading"
      divClassName="flex flex-col gap-10"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Text
          size="sm"
          transform="uppercase"
          className="tracking-widest text-accent"
        >
          What&apos;s happening
        </Text>
        <Heading id="our-latest-updates-heading" level={2}>
          Latest Announcements
        </Heading>
      </div>

      <div className="flex flex-col gap-6">
        <UpdateCard update={featured} featured />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((update) => (
            <UpdateCard key={update.slug} update={update} />
          ))}
        </div>
      </div>

      <Link href="/updates/announcements" className="self-center">
        <Button variant="secondary" className="px-6 py-2.5">
          See more
        </Button>
      </Link>
    </Section>
  )
}
