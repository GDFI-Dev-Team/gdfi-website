'use client'

import { useRef, useState } from 'react'
import MpaMap from './mpa-map'

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

/** How long the zoom animation takes, in ms (slow, deliberate). */
const DURATION = 1600

/**
 * Static layout for the Bagonbanua map — no scroll coupling. The map zooms only
 * when the user clicks the map or the "Zoom to Bagonbanua" button, animating
 * smoothly between the full Samar view (0) and the MPA close-up (1).
 *
 *   • Desktop: map left, description right.
 *   • Mobile: map on top, description below.
 *
 * `children` is the (server-rendered) description column.
 */
export default function MpaSection({
  children,
}: {
  children: React.ReactNode
}) {
  const [progress, setProgress] = useState(0)
  const progRef = useRef(0)
  const animRef = useRef(0)

  const animateTo = (target: number) => {
    cancelAnimationFrame(animRef.current)
    const start = progRef.current
    const t0 = performance.now()
    const step = (t: number) => {
      const k = clamp01((t - t0) / DURATION)
      const v = start + (target - start) * easeInOut(k)
      progRef.current = v
      setProgress(v)
      if (k < 1) animRef.current = requestAnimationFrame(step)
    }
    animRef.current = requestAnimationFrame(step)
  }

  const toggle = () => animateTo(progRef.current > 0.5 ? 0 : 1)

  return (
    <section
      aria-labelledby="mpa-featured"
      className="px-(--gutter) py-12 md:py-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Map — borderless, on the page background; only the figures show. */}
        <div className="mx-auto aspect-square w-full max-w-md border-0 bg-background md:max-w-none">
          <MpaMap progress={progress} onToggle={toggle} className="h-full" />
        </div>

        {/* Description — right on desktop, below on mobile. */}
        <div>{children}</div>
      </div>
    </section>
  )
}
