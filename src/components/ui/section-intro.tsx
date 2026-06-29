import Heading from './heading'
import Text from './text'
import { cn } from '@/lib/utils/cn-merge'

/**
 * The eyebrow + heading pair that introduces a homepage section.
 * Centered by default; pass align="start" for left-aligned layouts.
 * The eyebrow is flanked by a short accent rule for a more branded look.
 */
export default function SectionIntro({
  eyebrow,
  title,
  id,
  align = 'center',
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  id?: string
  align?: 'center' | 'start'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        centered ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex items-center gap-3',
          centered &&
            "before:h-px before:w-8 before:bg-accent/60 before:content-['']",
          "after:h-px after:w-8 after:bg-accent/60 after:content-['']",
        )}
      >
        <Text
          size="sm"
          transform="uppercase"
          className="font-semibold tracking-[0.2em] text-accent"
        >
          {eyebrow}
        </Text>
      </span>
      <Heading id={id} level={2}>
        {title}
      </Heading>
    </div>
  )
}
