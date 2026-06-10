// src/components/ui/marquee.tsx
import { cn } from '@/lib/utils'

export default function Marquee({
  children,
  className,
  pauseOnHover = true,
  repeat = 4,
}: {
  children: React.ReactNode
  className?: string
  pauseOnHover?: boolean
  repeat?: number
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div
        className={cn(
          'flex w-max gap-16 animate-marquee motion-reduce:animate-none',
          pauseOnHover && 'hover:[animation-play-state:paused]',
          className,
        )}
        style={
          {
            '--marquee-translate': `-${(100 / repeat).toFixed(4)}%`,
          } as React.CSSProperties
        }
      >
        {children}
        {Array.from({ length: repeat - 1 }).map((_, i) => (
          <div key={i} aria-hidden="true" style={{ display: 'contents' }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
