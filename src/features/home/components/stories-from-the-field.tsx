import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Reveal from '@/components/ui/reveal'
import Link from 'next/link'
import CommunityStoriesCard from '@/features/updates/community-stories/components/cs-card'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { getCommunityStories } from '@/features/updates/community-stories/data/community-stories'
import { cn } from '@/lib/utils/cn-merge'

export default async function StoriesFromTheField() {
  const { items } = await getCommunityStories(1, {})
  const stories = items.slice(0, 3)

  if (stories.length === 0) return null
  return (
    <Section
      aria-labelledby="stories-heading"
      sectionClassName="relative overflow-hidden bg-foreground/3"
      divClassName="flex flex-col gap-10"
    >
      <Reveal className="flex flex-col items-center gap-3 text-center">
        <Text
          size="lg"
          transform="uppercase"
          className="tracking-widest text-accent font-semibold"
        >
          Stories from the field
        </Text>
        <Heading
          id="stories-heading"
          level={2}
          className="text-xl md:text-3xl lg:text-4xl"
        >
          Community Stories
        </Heading>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {stories.map((story, index) => (
          <Reveal
            key={story.slug}
            delay={index}
            className={
              index >= 2
                ? 'hidden lg:block'
                : index >= 1
                  ? 'hidden md:block'
                  : ''
            }
          >
            <CommunityStoriesCard article={story} />
          </Reveal>
        ))}
      </div>

      <Link
        href="/updates/community-stories"
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
