import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Link from 'next/link'
import CommunityStoriesCard from '@/features/updates/community-stories/components/cs-card'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { getCommunityStories } from '@/lib/content/community-stories'
import { cn } from '@/lib/utils/cn-merge'

export default async function Stories() {
  const { items } = await getCommunityStories(1, {})
  const stories = items.slice(0, 3)

  if (stories.length === 0) return null

  return (
    <Section
      aria-labelledby="stories-heading"
      sectionClassName="relative overflow-hidden bg-foreground/3"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {stories.map((story, index) => (
          <CommunityStoriesCard
            key={story.slug}
            article={story}
            className={
              index >= 2 ? 'hidden lg:flex' : index >= 1 ? 'hidden md:flex' : ''
            }
          />
        ))}
      </div>

      <Link
        href="/updates/community-stories"
        className={cn(
          buttonBase,
          buttonVariants.secondary,
          'self-center px-6 py-2.5',
        )}
      >
        See more
      </Link>
    </Section>
  )
}
