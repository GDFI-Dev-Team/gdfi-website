'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { RightUpCurve } from './layout-shapes'

const heroImages = ['hero-1.webp', 'hero-2.webp', 'hero-3.webp']

export const Hero = () => {
  const slides = [...heroImages, heroImages[0]]
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (heroImages.length < 2) return
    let id: ReturnType<typeof setInterval> | undefined

    const start = () => {
      if (id) return
      id = setInterval(() => setIndex((i) => i + 1), 5000)
    }
    const stop = () => {
      if (id) clearInterval(id)
      id = undefined
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const handleRest = () => {
    if (index >= heroImages.length) {
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
      {/* Slideshow backdrop */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Sliding track */}
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-hero-overlay/90 via-hero-overlay/70 to-hero-overlay/40 transition-[--hero-overlay] duration-300 ease-[ease] dark:from-hero-overlay/90 dark:via-hero-overlay/20 dark:to-hero-overlay/5" />
        {/* Top scrim */}
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-hero-overlay/80 to-transparent transition-[--hero-overlay] duration-300 ease-[ease]" />
      </div>

      {/* Curved panel bridging the hero into the section below */}
      <RightUpCurve />

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
