import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import LikeButton from './like-button'
import { formatCount } from '@/lib/utils'
import { stories } from '../data/stories'

const Stories = () => {
  return (
    <Section
      aria-labelledby="stories-heading"
      sectionClassName="bg-foreground/3"
      divClassName="flex flex-col gap-10"
    >
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
        {stories.map((story) => (
          <article
            key={story.slug}
            className="group flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-16/10 overflow-hidden">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
              <Text
                size="xs"
                transform="uppercase"
                className="tracking-widest text-foreground/50"
              >
                {story.datePublished}
              </Text>
              <Heading level={3}>{story.title}</Heading>
              <Text className="text-foreground/70">{story.subtitle}</Text>

              <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-4">
                <div className="inline-flex items-center gap-1.5 text-foreground/60">
                  <Eye size={16} aria-hidden="true" />
                  <Text size="sm">{formatCount(story.views)} views</Text>
                </div>
                <LikeButton
                  count={story.likes}
                  className="text-foreground/60 hover:text-like"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export default Stories
