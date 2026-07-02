'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn-merge'
import { VIEW, ISLAND_PATH, MPA_PATH, MPA_CENTER } from '../data/geo'

/** viewBox for the whole Samar silhouette.
    The generated geometry fills [0..VIEW.w, 0..VIEW.h] edge-to-edge, so we pad
    the frame outward to keep the island fully visible and clear of the wrapper. */
const PAD = 0.1
const FULL = {
  x: -VIEW.w * PAD,
  y: -VIEW.h * PAD,
  w: VIEW.w * (1 + 2 * PAD),
  h: VIEW.h * (1 + 2 * PAD),
}
/** how wide (in viewBox units) the deepest zoom frames the MPA — smaller = closer */
const FOCUS_W = 16
const FOCUS = {
  x: MPA_CENTER.x - FOCUS_W / 2,
  y: MPA_CENTER.y - (FOCUS_W * VIEW.h) / VIEW.w / 2,
  w: FOCUS_W,
  h: (FOCUS_W * VIEW.h) / VIEW.w,
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Presentational map. `progress` (0 → 1) drives the zoom from the full Samar
 * silhouette down to the Bagonbanua MPA polygon; the parent owns how progress is
 * produced (pinned scroll + click). `onToggle` is fired on click / button.
 */
export default function MpaMap({
  progress,
  onToggle,
  className,
}: {
  progress: number
  onToggle: () => void
  className?: string
}) {
  const [hover, setHover] = useState(false)

  const e = easeInOut(clamp01(progress))
  const vb = {
    x: lerp(FULL.x, FOCUS.x, e),
    y: lerp(FULL.y, FOCUS.y, e),
    w: lerp(FULL.w, FOCUS.w, e),
    h: lerp(FULL.h, FOCUS.h, e),
  }

  const zoomed = progress > 0.02
  const markerOpacity = zoomed ? 0 : hover ? 1 : 0.55
  const shapeOpacity = clamp01((progress - 0.35) / 0.4)
  const labelShown = progress > 0.55

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden select-none',
        className,
      )}
    >
      <svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        className="h-full w-full cursor-pointer"
        role="img"
        aria-label="Map of Samar island highlighting the Bagonbanua Marine Reserve near Guiuan"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onToggle}
      >
        {/* Samar island — one grey fill, no borders. Highlights on hover. */}
        <path
          d={ISLAND_PATH}
          className={cn(
            'transition-[fill] duration-300 ease-out',
            hover || zoomed ? 'fill-foreground/25' : 'fill-foreground/10',
          )}
        />

        {/* Bagonbanua MPA boundary — fades in as you zoom in. */}
        <path
          d={MPA_PATH}
          className="fill-accent/35 stroke-accent"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          style={{ opacity: shapeOpacity }}
        />

        {/* Location marker at island scale (halo + dot), fades out on zoom. */}
        <g
          style={{ opacity: markerOpacity }}
          className="transition-opacity duration-300 ease-out"
        >
          <circle
            cx={MPA_CENTER.x}
            cy={MPA_CENTER.y}
            r={16}
            className="fill-accent/25 animate-pulse"
          />
          <circle
            cx={MPA_CENTER.x}
            cy={MPA_CENTER.y}
            r={6}
            className="fill-accent stroke-background"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      {/* Zoomed-in label (crisp HTML overlay, top-centred). */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-3 flex justify-center transition-opacity duration-500 ease-out',
          labelShown ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold tracking-wide text-accent backdrop-blur-sm md:text-sm">
          Bagonbanua Marine Reserve &amp; Sanctuary
        </span>
      </div>

      {/* Zoom control. */}
      <button
        type="button"
        onClick={onToggle}
        className="absolute left-1/2 bottom-3 -translate-x-1/2 rounded-full bg-btn-primary px-4 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-btn-primary-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
      >
        {zoomed ? 'Reset view' : 'Zoom to Bagonbanua'}
      </button>
    </div>
  )
}
