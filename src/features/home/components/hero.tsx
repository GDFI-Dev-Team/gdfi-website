'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Section from '@/components/ui/section'

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
    <Section
      sectionClassName="relative min-h-[70svh] overflow-hidden"
      divClassName="absolute inset-0"
      maxWidth="none"
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
    </Section>
  )
}
