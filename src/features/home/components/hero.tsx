'use client'
import { useState, useEffect } from 'react'
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

  return (
    <section
      className="relative overflow-hidden p-16"
      aria-label="Tourism hero"
    >
      {heroImages.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(feat-hero/${img})`,
            opacity: i === heroIndex ? 1 : 0,
          }}
          aria-hidden={i !== heroIndex}
        />
      ))}
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/65" />

      {/* Hero section heading + text */}
      <div className="relative z-10">
        <Heading>Hero</Heading>
        <Text>
          This is a sample Hero section for the GDFI website along with a
          Slideshow Effect.
        </Text>
      </div>
    </section>
  )
}
