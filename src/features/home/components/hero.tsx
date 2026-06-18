'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { HeroCurve } from '@/features/home/ui/LayoutShapes'

const heroImages = ['hero-1.webp', 'hero-2.webp', 'hero-3.webp']

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
      divClassName="flex w-full flex-col justify-center gap-8 pb-24 md:pb-32"
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
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority={i === 0}
                loading={i === 0 ? undefined : 'eager'}
              />
            </div>
          ))}
        </div>
        {/* Overlay — darkest behind the text, easing off to the right. Fades
            with the theme at the same 0.3s as the rest of the page.
            Light theme uses the /90 /70 /40 stops; the light scrim (dark theme)
            has its own opacity via the dark:*/}
        <div className="absolute inset-0 bg-linear-to-r from-hero-overlay/90 via-hero-overlay/70 to-hero-overlay/40 transition-[--hero-overlay] duration-300 ease-[ease] dark:from-hero-overlay/90 dark:via-hero-overlay/20 dark:to-hero-overlay/5" />
        {/* Top scrim — darkens the band behind the fixed navbar so it stays
            legible over busy photos, fading out just past the navbar height.
            Flips light in dark mode like the main overlay. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-hero-overlay/80 to-transparent transition-[--hero-overlay] duration-300 ease-[ease]" />
      </div>

      {/* Curved panel bridging the hero into the section below */}
      <HeroCurve />

      <div className="relative z-30 flex max-w-3xl flex-col gap-5">
        <Heading
          level={1}
          className="animate-fade-up text-text-standard transition-colors duration-300 ease-[ease] [animation-delay:100ms]"
        >
          From ridge to reef
        </Heading>
        <Text
          size="lg"
          className="max-w-prose animate-fade-up text-text-muted transition-colors duration-300 ease-[ease] [animation-delay:200ms]"
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
                ? 'w-8 bg-text-standard'
                : 'w-4 bg-text-faint hover:bg-text-subtle',
            )}
          />
        ))}
      </div>
    </Section>
  )
}
