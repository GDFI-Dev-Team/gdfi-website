'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'

const heroImages = ['hero-1.webp', 'hero-2.webp', 'hero-3.webp']

// Shared path for both breakpoints; only the surrounding transforms differ.
const CURVE_PATH =
  'M1874.208,2864.024L386.691,2864.024L386.691,2317.861L1253.726,2317.861C1402.095,2318.076 1490.768,2367.359 1579.143,2483.69L1874.208,2864.024Z'

/**
 * Decorative curved panel at the bottom of the hero. Inlined (not <img>) so its
 * fill follows the theme via `fill-background` — it shares the next section's
 * background colour, making the hero read as merging into the section below.
 */
function HeroCurve() {
  return (
    <div
      // Nudged 1px below the section edge (clipped by the hero's overflow-hidden)
      // so the mobile SVG's fractional scaleY can't leave a hairline gap.
      className="pointer-events-none absolute inset-x-0 -bottom-px z-20"
      aria-hidden="true"
    >
      {/* Desktop */}
      <svg
        className="hidden h-auto w-full fill-background md:block"
        viewBox="0 0 4727 547"
        preserveAspectRatio="none"
      >
        <g transform="matrix(1,0,0,1,-60.770062,-1480.855676)">
          <g transform="matrix(1,0,0,1,-48.843721,-762.407557)">
            <g transform="matrix(1,0,0,1,-277.077636,-74.597825)">
              <path d={CURVE_PATH} fillRule="evenodd" clipRule="evenodd" />
            </g>
          </g>
        </g>
      </svg>
      {/* Mobile */}
      <svg
        className="block h-auto w-full fill-background md:hidden"
        viewBox="0 0 2960 746"
        preserveAspectRatio="none"
      >
        <g transform="matrix(1,0,0,1,-1755.474488,-2333.400621)">
          <g transform="matrix(1,0,0,1,1645.860705,289.952609)">
            <g transform="matrix(1,0,0,1.365853,-277.077636,-1122.409352)">
              <path d={CURVE_PATH} fillRule="evenodd" clipRule="evenodd" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export const Hero = () => {
  // A clone of the first slide is appended so the track can keep sliding
  // right-to-left past the last image, then silently snap back to the start.
  const slides = [...heroImages, heroImages[0]]
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (heroImages.length < 2) return
    const id = setInterval(() => setIndex((i) => i + 1), 5000)
    return () => clearInterval(id)
  }, [])

  // When we've slid onto the clone, jump back to the real first slide with
  // the transition disabled so the reset is invisible.
  const handleRest = () => {
    if (index === heroImages.length) {
      setAnimate(false)
      setIndex(0)
    }
  }
  useEffect(() => {
    if (animate) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    )
    return () => cancelAnimationFrame(id)
  }, [animate])

  const activeIndex = index % heroImages.length

  const goTo = (i: number) => {
    setAnimate(true)
    setIndex(i)
  }

  return (
    <Section
      sectionClassName="relative isolate flex min-h-[80svh] overflow-hidden"
      divClassName="flex w-full flex-col justify-center gap-8"
      aria-label="Hero section"
    >
      {/* Slideshow backdrop — full-bleed behind the content */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Sliding track — each slide is full-width; translating the row left
            moves images right-to-left. */}
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animate ? 'transform 1000ms ease-in-out' : 'none',
          }}
          onTransitionEnd={handleRest}
        >
          {slides.map((img, i) => (
            <div
              key={`${img}-${i}`}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={`/feat-hero/${img}`}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
                loading={i === 0 ? undefined : 'eager'}
              />
            </div>
          ))}
        </div>
        {/* Overlay — darkest behind the text, easing off to the right */}
        <div className="absolute inset-0 bg-linear-to-r from-hero-overlay/90 via-hero-overlay/70 to-hero-overlay/40" />
      </div>

      {/* Curved panel bridging the hero into the section below */}
      <HeroCurve />

      <div className="relative z-30 flex max-w-3xl flex-col gap-5">
        <Heading
          level={1}
          className="animate-fade-up text-on-overlay [animation-delay:100ms]"
        >
          From ridge to reef
        </Heading>
        <Text
          size="lg"
          className="max-w-prose animate-fade-up text-on-overlay-muted [animation-delay:200ms]"
        >
          We work hand-in-hand with fishing communities across Eastern Samar,
          Philippines — protecting marine ecosystems and building sustainable
          coastal livelihoods.
        </Text>
      </div>

      {/* Slide indicators */}
      <div className="relative z-30 flex gap-2 animate-fade-up [animation-delay:400ms]">
        {heroImages.map((img, i) => (
          <button
            key={img}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === activeIndex}
            onClick={() => goTo(i)}
            className={cn(
              'h-1.5 cursor-pointer rounded-full transition-all duration-300',
              i === activeIndex
                ? 'w-8 bg-on-overlay'
                : 'w-4 bg-on-overlay-faint hover:bg-on-overlay-subtle',
            )}
          />
        ))}
      </div>
    </Section>
  )
}
