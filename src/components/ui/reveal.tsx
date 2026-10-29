'use client'

import { useEffect, useRef } from 'react'

/** Per-item stagger, and the cap so long lists don't trickle in. */
const STAGGER_MS = 70
const MAX_STAGGER_STEPS = 5

/** True while the hero/banner copy (`animate-fade-up`) is still entering. */
function isPageIntroPlaying() {
  return document
    .getAnimations()
    .some(
      (a) =>
        a instanceof CSSAnimation &&
        a.animationName === 'fade-up' &&
        a.playState === 'running' &&
        !(a.effect as KeyframeEffect | null)?.target?.closest('[data-reveal]'),
    )
}

/**
 * Fades + lifts its content in — on page load if it's on screen, otherwise
 * the first time it scrolls into view.
 *
 * The entrance starts in CSS from the first paint (`load`), so it never waits
 * on JS and nothing stays hidden if JS fails. `load` is delayed so on-screen
 * content follows the hero/banner copy. After hydration:
 *   - below the fold → parked (`pending`), replayed when scrolled to (`shown`)
 *   - on screen with no page intro playing (e.g. new filter results) →
 *     `enter`, same entrance without the delay, so feedback is immediate.
 * Skipped under `prefers-reduced-motion`. Styles live in globals.css.
 *
 * `data-reveal` is rendered once as a constant and only changed here, never
 * by React — a re-render that changed it would clobber these states.
 *
 * Don't put this on an element that has its own `transition-all` /
 * `transition-opacity` (e.g. a card with a hover effect) — a transition beats
 * the reveal animation in the cascade. Wrap that element instead.
 *
 * @param delay Position in a staggered group (0, 1, 2…), not milliseconds.
 * @param as    Element to render, so it can replace a wrapper (e.g. an `li`).
 */
export default function Reveal({
  children,
  delay = 0,
  as: Component = 'div',
  className,
}: {
  children: React.ReactNode
  delay?: number
  as?: 'div' | 'li'
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // On screen (or already scrolled past): its entrance is already playing.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      if (!isPageIntroPlaying()) el.dataset.reveal = 'enter'
      return
    }

    el.dataset.reveal = 'pending'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.reveal = 'shown'
        observer.disconnect()
      },
      // - Bottom -10%: trigger once the top edge is 10% into the viewport.
      // - Top extended "infinitely": anything scrolled past also counts, so
      //   a fast fling or jump that skips an element in one frame (no edge
      //   crossing, so no callback otherwise) never leaves it hidden.
      // - Threshold 0: a ratio would never fire on blocks taller than the
      //   screen.
      { threshold: 0, rootMargin: '1000000px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Component
      ref={ref as React.Ref<never>}
      data-reveal="load"
      style={
        delay
          ? ({
              '--reveal-delay': `${Math.min(delay, MAX_STAGGER_STEPS) * STAGGER_MS}ms`,
            } as React.CSSProperties)
          : undefined
      }
      className={className}
    >
      {children}
    </Component>
  )
}
