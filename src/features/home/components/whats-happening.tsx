import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'
import ShareButton from '@/components/ui/share-button'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { getAnnouncements } from '@/lib/content/announcements'
import { ArticleContent } from '@/lib/content/types'
import { formatEdgeDate } from '@/lib/utils/date'
import { toPlainText } from '@/lib/content/markdown'
import { cn } from '@/lib/utils/cn-merge'

const UpdateCard = ({
  update,
  featured = false,
  className,
}: {
  update: ArticleContent
  featured?: boolean
  className?: string
}) => {
  const imageSrc =
    update.featured_images?.[0] || '/nav-item-banner-images/announcements.webp'
  const previewText = update.excerpt?.trim() || toPlainText(update.body)

  return (
    <article
      className={cn(
        featured
          ? 'group relative overflow-hidden rounded-xl aspect-4/3 sm:aspect-[21/9]'
          : 'group relative overflow-hidden rounded-xl aspect-4/3 sm:aspect-[4/5]',
        className,
      )}
    >
      <Link
        href={`/updates/announcements/${update.slug}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only ">Read {update.title}</span>
      </Link>

      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <ShareButton
          url={`/updates/announcements/${update.slug}`}
          title={update.title}
          className="h-9 w-9 p-0 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm border-none"
        />
      </div>

      <figure className="absolute inset-0 m-0">
        <Image
          src={imageSrc}
          alt={update.title}
          fill
          sizes={
            featured
              ? '(min-width: 1280px) 1280px, 100vw'
              : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
          }
          loading="eager"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          aria-hidden="true"
        />
      </figure>
      <div
        className="absolute inset-0 bg-linear-to-t from-overlay/90 via-overlay/60 to-overlay/10 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className={
          featured
            ? 'absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-10 pointer-events-none'
            : 'absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6 pointer-events-none'
        }
      >
        <time
          dateTime={
            update.date ? new Date(update.date).toISOString() : undefined
          }
          className="text-xs uppercase tracking-widest text-on-overlay-subtle block"
        >
          {formatEdgeDate(update.date)}
        </time>
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
        <Text
          size="sm"
          className={cn(
            'text-on-overlay/80 max-w-3xl',
            featured ? 'line-clamp-3' : 'line-clamp-1',
          )}
        >
          {previewText}
        </Text>
      </div>
    </article>
  )
}

export default async function WhatsHapenning() {
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
          size="lg"
          transform="uppercase"
          className="tracking-widest text-accent font-semibold"
        >
          What&apos;s happening
        </Text>
        <Heading
          id="our-latest-updates-heading"
          level={2}
          className="text-xl md:text-3xl lg:text-4xl"
        >
          Latest Announcements
        </Heading>
      </div>

      <div className="flex flex-col gap-6">
        <UpdateCard update={featured} featured />
        <ul className="hidden md:grid grid-cols-2 gap-6 lg:grid-cols-4 list-none p-0 m-0">
          {rest.map((update, index) => (
            <li
              key={update.slug}
              className={cn(
                'flex flex-col',
                index >= 2 ? 'hidden lg:flex' : '',
              )}
            >
              <UpdateCard update={update} className="h-full w-full" />
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/updates/announcements"
        className={cn(
          buttonBase,
          buttonVariants.secondary,
          'self-center px-4 py-2 text-sm md:px-6 md:py-2.5 md:text-base',
        )}
      >
        See more
      </Link>
    </Section>
  )
}
