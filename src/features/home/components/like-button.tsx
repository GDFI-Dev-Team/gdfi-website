'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { cn, formatCount } from '@/lib/utils'

/* Temporary client-only like toggle until engagement is wired to an API */
export default function LikeButton({
  count,
  className,
}: {
  count: number
  className?: string
}) {
  const [liked, setLiked] = useState(false)

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? 'Unlike' : 'Like'}
      onClick={() => setLiked((v) => !v)}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 transition-colors',
        liked ? 'text-like' : className,
      )}
    >
      <Heart
        size={16}
        aria-hidden="true"
        className={cn(
          'transition-transform duration-200',
          liked && 'scale-110 fill-current',
        )}
      />
      <span className="text-sm">{formatCount(count + (liked ? 1 : 0))}</span>
    </button>
  )
}
