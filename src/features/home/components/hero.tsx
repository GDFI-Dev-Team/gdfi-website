'use client'
import { useState, useEffect } from 'react'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn-merge'
import { RightUpCurve } from './layout-shapes'
import { Program } from '@/lib/content/types'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'

export const Hero = ({ programs }: { programs: Program[] }) => {
  // Duplicate the first slide so the track can loop seamlessly back to the start.
  const slides = programs.length > 1 ? [...programs, programs[0]] : programs
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (programs.length < 2) return
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
  }, [programs.length])

  const handleRest = () => {
    if (index >= programs.length) {
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

  const activeIndex = programs.length ? index % programs.length : 0
  const active = programs[activeIndex]

  const goTo = (i: number) => {
    setAnimate(true)
    setIndex(i)
  }

  return (
    <Section
      sectionClassName="relative isolate flex min-h-[70svh] overflow-hidden pt-20 md:min-h-[80svh] md:pt-28 lg:pt-32"
      divClassName="flex w-full flex-col justify-center gap-8"
      aria-label="Hero section"
    >
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animate ? 'transform 1000ms ease-in-out' : 'none',
          }}
          onTransitionEnd={handleRest}
        >
          {slides.map((program, i) => (
            <div
              key={`${program.slug}-${i}`}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={program['featured-img']}
                alt={program.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority={i === 0}
                loading={i === 0 ? undefined : 'eager'}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-hero-overlay/90 via-hero-overlay/70 to-hero-overlay/40 transition-[--hero-overlay] duration-300 ease-[ease] dark:from-hero-overlay/90 dark:via-hero-overlay/20 dark:to-hero-overlay/5" />

        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-hero-overlay/80 to-transparent transition-[--hero-overlay] duration-300 ease-[ease]" />
      </div>

      <RightUpCurve />

      {active && (
        <div
          key={active.slug}
          className="relative z-30 flex max-w-3xl flex-col gap-5"
        >
          <Heading
            level={1}
            className="animate-fade-up text-2xl text-text-standard leading-tight transition-colors duration-300 ease-[ease] [animation-delay:100ms] md:text-4xl lg:text-6xl"
          >
            {active.title}
          </Heading>
          <Text className="line-clamp-3 max-w-prose animate-fade-up text-sm text-text-muted transition-colors duration-300 ease-[ease] [animation-delay:200ms] md:text-lg">
            {active['short-description']}
          </Text>
          <Link
            href={`/our-works/programs-and-projects/${active.slug}`}
            className={cn(
              buttonBase,
              buttonVariants.primary,
              'mt-1 w-fit animate-fade-up gap-2 px-5 py-2.5 [animation-delay:300ms]',
            )}
          >
            Read more
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      {programs.length > 1 && (
        <div className="relative z-30 flex gap-2 animate-fade-up [animation-delay:400ms]">
          {programs.map((program, i) => (
            <button
              key={program.slug}
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
      )}
    </Section>
  )
}
