'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const heroImages = ['hero-1.webp', 'hero-2.webp', 'hero-3.webp']

export const Hero = () => {
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    if (heroImages.length < 2) return
    const id = setInterval(
      () => setHeroIndex((i) => (i + 1) % heroImages.length),
      5000,
    )
    return () => clearInterval(id)
  }, [heroIndex])

  const nextIndex = (heroIndex + 1) % heroImages.length

  return (
    <Section
      sectionClassName="relative isolate flex min-h-[88svh] overflow-hidden"
      divClassName="flex w-full flex-col justify-center gap-8 pt-16"
      aria-label="Hero section"
    >
      {/* Slideshow backdrop — full-bleed behind the content */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {heroImages.map((img, i) => {
          const isActive = i === heroIndex
          const isNext = i === nextIndex
          return (
            <Image
              key={img}
              src={`/feat-hero/${img}`}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1.2)' : 'scale(1)',
                transition:
                  'opacity 1000ms ease-in-out, transform 6000ms ease-out',
              }}
              priority={i === 0}
              loading={
                i === 0 ? undefined : isActive || isNext ? 'eager' : 'lazy'
              }
            />
          )
        })}
        {/* Overlay — darkest behind the text, easing off to the right */}
        <div className="absolute inset-0 bg-linear-to-r from-hero-overlay/90 via-hero-overlay/70 to-hero-overlay/40" />
      </div>

      <div className="flex max-w-3xl flex-col gap-5">
        <Text
          size="sm"
          transform="uppercase"
          className="animate-fade-up tracking-widest text-accent"
        >
          Guiuan Development Foundation, Inc.
        </Text>
        <Heading
          level={1}
          className="animate-fade-up text-white [animation-delay:100ms]"
        >
          Thriving coasts, resilient communities
        </Heading>
        <Text
          size="lg"
          className="max-w-prose animate-fade-up text-white/80 [animation-delay:200ms]"
        >
          We work hand-in-hand with fishing communities across Eastern Samar,
          Philippines — protecting marine ecosystems and building sustainable
          coastal livelihoods.
        </Text>
        <div className="flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:300ms]">
          <Link
            href="/donate"
            className={cn(
              buttonBase,
              buttonVariants.primary,
              'rounded-full px-6 py-3',
            )}
          >
            Donate today
          </Link>
          <Link
            href="#who-we-are"
            className={cn(
              buttonBase,
              'rounded-full border border-white/40 px-6 py-3 text-white hover:bg-white/10',
            )}
          >
            Learn who we are
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="flex gap-2 animate-fade-up [animation-delay:400ms]">
        {heroImages.map((img, i) => (
          <button
            key={img}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === heroIndex}
            onClick={() => setHeroIndex(i)}
            className={cn(
              'h-1.5 cursor-pointer rounded-full transition-all duration-300',
              i === heroIndex
                ? 'w-8 bg-white'
                : 'w-4 bg-white/40 hover:bg-white/70',
            )}
          />
        ))}
      </div>
    </Section>
  )
}
