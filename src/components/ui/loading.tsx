import { cn } from '@/lib/utils'

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse w-full', className)}
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="w-full rounded-xl bg-foreground/3 border border-foreground/8 flex flex-col">
        <div className="min-h-105 flex flex-col gap-4 p-4">
          <div className="flex-1 rounded-lg bg-foreground/8 min-h-80" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full rounded bg-foreground/8" />
            <div className="h-3 w-4/5 rounded bg-foreground/8" />
            <div className="h-3 w-3/5 rounded bg-foreground/8" />
          </div>
        </div>
        <div className="flex justify-center px-4 py-2.5 border-t border-foreground/8 rounded-b-xl">
          <div className="h-6 w-16 rounded-md bg-foreground/8" />
        </div>
      </div>
    </div>
  )
}
