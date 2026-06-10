'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'

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
  }, [])

  const nextIndex = (heroIndex + 1) % heroImages.length

  return (
    <section
      className="relative min-h-[70svh] overflow-hidden py-16 px-(--gutter)"
      aria-label="Hero section"
    >
      {heroImages.map((img, i) => {
        const isActive = i === heroIndex
        const isNext = i === nextIndex
        return (
          <Image
            key={img}
            src={`/feat-hero/${img}`}
            alt={`slideshow-${img}`}
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
            aria-hidden={true}
          />
        )
      })}
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/65" />

      {/* Hero section heading + text */}
      <div className="relative z-10 pt-24">
        <Heading>Hero</Heading>
        <Text>
          This is a sample Hero section for the GDFI website along with a
          Slideshow Effect.
        </Text>
      </div>
    </section>
  )
}
