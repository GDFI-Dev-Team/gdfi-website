import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import LikeButton from './like-button'
import { formatCount } from '@/lib/utils'
import { mockNewsArticles } from '@/features/news/data/mock'

const Stories = () => {
  const stories = mockNewsArticles.filter(
    (a) => a.category === 'COMMUNITY STORIES',
  )

  if (stories.length === 0) return null

  return (
    <Section
      aria-labelledby="stories-heading"
      sectionClassName="relative overflow-hidden bg-foreground/3"
      divClassName="flex flex-col gap-10"
    >
      {/* Curve bridging the white section above down into this tinted one. The
          fill matches the section above (bg-background). */}

      <div className="flex flex-col items-center gap-3 text-center">
        <Text
          size="sm"
          transform="uppercase"
          className="tracking-widest text-accent"
        >
          Stories from the field
        </Text>
        <Heading id="stories-heading" level={2}>
          Community Stories
        </Heading>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {stories.map((story) => {
          const imageSrc = story.images?.[0]?.src || '/feat-hero/hero-3.webp'

          return (
            <article
              key={story.id}
              className="group flex flex-col overflow-hidden rounded-xl bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <Link
                href={`/news/${story.id}`}
                className="relative aspect-16/10 overflow-hidden block"
              >
                <Image
                  src={imageSrc}
                  alt={story.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                <Text
                  size="xs"
                  transform="uppercase"
                  className="tracking-widest text-foreground/50"
                >
                  {story.date}
                </Text>
                <Link
                  href={`/news/${story.id}`}
                  className="hover:underline decoration-foreground/30 underline-offset-4"
                >
                  <Heading level={3}>{story.title}</Heading>
                </Link>
                <Text className="text-foreground/70 line-clamp-2">
                  {story.content}
                </Text>

                <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-4">
                  <div className="inline-flex items-center gap-1.5 text-foreground/60">
                    <Eye size={16} aria-hidden="true" />
                    <Text size="sm">{formatCount(story.views || 0)} views</Text>
                  </div>
                  <LikeButton
                    count={story.likes || 0}
                    className="text-foreground/60 hover:text-like"
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export default Stories
