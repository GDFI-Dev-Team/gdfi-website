'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X } from 'lucide-react'
import Section from '@/components/ui/section'
import Heading from '@/components/ui/heading'
import Marquee from '@/components/ui/marquee'
import Text from '@/components/ui/text'
import { partners, awards } from '../data/badges'
import { cn } from '@/lib/utils/cn-merge'

type BadgeItem =
  | ((typeof awards)[0] & { type: 'award' })
  | ((typeof partners)[0] & { type: 'partner' })

function BadgeCard({ badge }: { badge: BadgeItem }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const cardRef = useRef<HTMLDivElement | HTMLAnchorElement>(null)
  const isAward = badge.type === 'award'

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  const updateTooltipPosition = () => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()

    setTooltipStyle({
      position: 'fixed',
      top: rect.top - 12,
      left: rect.left + rect.width / 2,
      transform: 'translate(-50%, -100%)',
      zIndex: 9999,
    })
  }

  const handleMouseEnter = () => {
    if (!isAward) return
    updateTooltipPosition()
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!isAward) return
    setIsHovered(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isAward) {
      e.preventDefault()
      setIsModalOpen(true)
      setIsHovered(false) // Hide tooltip when modal opens
    }
  }

  const containerClasses = cn(
    'group flex flex-col gap-2 w-28 md:gap-4 md:w-40 items-center opacity-60 hover:opacity-100 transition-opacity duration-300 rounded-xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50',
    badge.link || isAward ? 'cursor-pointer' : 'cursor-default',
  )

  const innerContent = (
    <>
      <div className="relative h-10 w-14 shrink-0 md:h-16 md:w-20">
        <Image
          src={`/badges/${badge.file}.webp`}
          alt={badge.name}
          fill
          sizes="144px"
          unoptimized
          className={cn(
            'object-contain transition-transform duration-300',
            isAward && 'scale-110 drop-shadow-sm group-hover:scale-125',
          )}
        />
      </div>
      <Text
        size="xs"
        className="w-full text-center truncate group-hover:whitespace-normal group-hover:overflow-visible"
      >
        {badge.name}
      </Text>
    </>
  )

  const portals = (
    <>
      {isAward &&
        isHovered &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={tooltipStyle}
            className="hidden md:flex flex-col w-72 p-4 bg-background border border-foreground/15 shadow-xl rounded-2xl pointer-events-none animate-fade-in"
          >
            <Text size="sm" className="font-bold mb-1.5 leading-tight">
              {badge.name}
            </Text>
            <Text size="xs" className="text-foreground/70 leading-relaxed">
              {badge.description}
            </Text>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-background border-b border-r border-foreground/15 rotate-45" />
          </div>,
          document.body,
        )}

      {isAward &&
        isModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            onClick={(e) => {
              e.stopPropagation()
              setIsModalOpen(false)
            }}
          >
            <div
              className="bg-background w-full max-w-sm p-6 sm:p-8 rounded-3xl shadow-xl relative animate-fade-up flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-foreground/5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="relative h-16 w-20 mb-4">
                  <Image
                    src={`/badges/${badge.file}.webp`}
                    alt={badge.name}
                    fill
                    sizes="144px"
                    className="object-contain drop-shadow-sm"
                  />
                </div>
                <Heading level={4} className="mb-3 text-lg">
                  {badge.name}
                </Heading>
                <Text size="sm" className="text-foreground/80 leading-relaxed">
                  {badge.description}
                </Text>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )

  if (badge.link && !isAward) {
    return (
      <>
        <a
          ref={cardRef as React.Ref<HTMLAnchorElement>}
          href={badge.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${badge.name} website`}
          className={containerClasses}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {innerContent}
        </a>
        {portals}
      </>
    )
  }

  return (
    <>
      <div
        ref={cardRef as React.Ref<HTMLDivElement>}
        className={containerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role={isAward ? 'button' : undefined}
        tabIndex={isAward ? 0 : undefined}
        aria-label={isAward ? `View details for ${badge.name}` : undefined}
        onKeyDown={
          isAward
            ? (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setIsModalOpen(true)
                }
              }
            : undefined
        }
      >
        {innerContent}
      </div>
      {portals}
    </>
  )
}

export default function TrustBadges() {
  const allBadges: BadgeItem[] = [
    ...awards.map((award) => ({ ...award, type: 'award' as const })),
    ...partners.map((partner) => ({ ...partner, type: 'partner' as const })),
  ]

  return (
    <Section
      aria-labelledby="trust-badges-heading"
      divClassName="flex flex-col gap-6 w-full"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <Text
          size="lg"
          transform="uppercase"
          className="tracking-widest text-accent font-semibold"
        >
          Recognitions & Partnerships
        </Text>
        <Heading
          id="trust-badges-heading"
          level={2}
          className="text-xl md:text-3xl lg:text-4xl"
        >
          Trust Badges
        </Heading>
      </div>

      <Marquee>
        {allBadges.map((badge, index) => (
          <BadgeCard
            key={`${badge.type}-${badge.name}-${index}`}
            badge={badge}
          />
        ))}
      </Marquee>
    </Section>
  )
}
