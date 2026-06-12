import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import Image from 'next/image'
import { Eye, Clock } from 'lucide-react'
import LikeButton from './like-button'
import { formatCount } from '@/lib/utils'
import { updates, type Update } from '../data/updates'

const UpdateMeta = ({ update }: { update: Update }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/75">
    <div className="inline-flex items-center gap-1.5">
      <Eye size={16} aria-hidden="true" />
      <Text size="sm">{formatCount(update.views)}</Text>
    </div>
    <LikeButton
      count={update.likes}
      className="text-white/75 hover:text-white"
    />
    <div className="inline-flex items-center gap-1.5">
      <Clock size={16} aria-hidden="true" />
      <Text size="sm">{update.readMinutes} min read</Text>
    </div>
  </div>
)

const UpdateCard = ({
  update,
  featured = false,
}: {
  update: Update
  featured?: boolean
}) => (
  <article
    className={
      featured
        ? 'group relative overflow-hidden rounded-3xl aspect-4/3 sm:aspect-21/9'
        : 'group relative overflow-hidden rounded-3xl aspect-4/3 sm:aspect-4/5'
    }
  >
    <Image
      src={update.image}
      alt=""
      fill
      sizes={
        featured
          ? '(min-width: 1280px) 1280px, 100vw'
          : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
      }
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      aria-hidden="true"
    />
    {/* Dark scrim — heaviest behind the details at the bottom */}
    <div
      className="absolute inset-0 bg-linear-to-t from-overlay/90 via-overlay/45 to-overlay/10"
      aria-hidden="true"
    />

    <div
      className={
        featured
          ? 'absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-10'
          : 'absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6'
      }
    >
      <Text
        size="xs"
        transform="uppercase"
        className="tracking-widest text-white/70"
      >
        {update.date}
      </Text>
      <Heading
        level={featured ? 3 : 4}
        className={featured ? 'max-w-2xl text-white' : 'text-white'}
      >
        {update.title}
      </Heading>
      <UpdateMeta update={update} />
    </div>
  </article>
)

const OurLatestUpdates = () => {
  const [featured, ...rest] = updates

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
          Our Latest Updates
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

      <Button variant="secondary" className="self-center px-6 py-2.5">
        See more
      </Button>
    </Section>
  )
}

export default OurLatestUpdates
