import Text from '@/components/ui/text'
import { cn } from '@/lib/utils/cn-merge'
import { categoryColor } from '@/lib/utils/category-colors'

// Sizing variants:
//   card    — compact pill for use inside cards (community stories, programs)
//   article — larger pill for the article/detail header (the "blueprint" layout)
type TagVariant = 'card' | 'article'

// Colour treatment:
//   category — stable per-label colour from the categorical palette (fisherfolk,
//              women, …). This is the communities blueprint.
//   neutral  — muted surface pill for non-categorical labels (e.g. a programme tag)
type TagTone = 'category' | 'neutral'

const sizeStyles: Record<TagVariant, string> = {
  card: 'px-2 py-0.5 md:px-3 md:py-1.5',
  article: 'px-4 py-2',
}

const textSize: Record<TagVariant, 'xs' | 'sm'> = {
  card: 'xs',
  article: 'sm',
}

const listGap: Record<TagVariant, string> = {
  card: 'gap-1.5 md:gap-3',
  article: 'gap-2.5',
}

export function Tag({
  label,
  variant = 'card',
  tone = 'category',
  className,
}: {
  label: string
  variant?: TagVariant
  tone?: TagTone
  className?: string
}) {
  const color = tone === 'category' ? categoryColor(label) : undefined
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full',
        sizeStyles[variant],
        tone === 'neutral' && 'bg-foreground/10 text-foreground',
        className,
      )}
      style={
        color ? { backgroundColor: color.bg, color: color.text } : undefined
      }
    >
      <Text size={textSize[variant]} className="font-semibold tracking-wide">
        {label}
      </Text>
    </span>
  )
}

export function TagList({
  tags,
  variant = 'card',
  tone = 'category',
  className,
}: {
  tags: string[]
  variant?: TagVariant
  tone?: TagTone
  className?: string
}) {
  if (tags.length === 0) return null
  return (
    <ul
      className={cn(
        'flex flex-wrap list-none p-0 m-0',
        listGap[variant],
        className,
      )}
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Tag label={tag} variant={variant} tone={tone} />
        </li>
      ))}
    </ul>
  )
}

export default Tag
