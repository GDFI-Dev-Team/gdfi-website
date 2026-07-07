'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ExternalLink } from 'lucide-react'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { buttonBase, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/lib/content/types'
import { cn } from '@/lib/utils/cn-merge'

/**
 * A single Trust Badge. Every badge — partner or award — is a button that opens
 * the same details modal on click; the modal simply shows whatever fields are
 * present (description, external link). A hover tooltip previews the description
 * when there is one.
 */
export default function BadgeCard({ badge }: { badge: Badge }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const cardRef = useRef<HTMLButtonElement>(null)

  const typeLabel = badge.type === 'award' ? 'Award' : 'Partner'
  const hasTooltip = Boolean(badge.description)

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
    if (!hasTooltip) return
    updateTooltipPosition()
    setIsHovered(true)
  }

  const handleMouseLeave = () => setIsHovered(false)

  const openModal = () => {
    setIsModalOpen(true)
    setIsHovered(false) // Hide tooltip when modal opens
  }

  return (
    <>
      <button
        ref={cardRef}
        type="button"
        onClick={openModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={`View details for ${badge.name}`}
        className="group flex flex-col gap-2 w-28 md:gap-4 md:w-40 items-center opacity-60 hover:opacity-100 transition-opacity duration-300 rounded-xl p-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
      >
        <div className="relative h-10 w-14 shrink-0 md:h-16 md:w-20">
          <Image
            src={badge.logo}
            alt={badge.name}
            fill
            sizes="144px"
            unoptimized
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <Text
          size="xs"
          className="w-full text-center truncate group-hover:whitespace-normal group-hover:overflow-visible"
        >
          {badge.name}
        </Text>
      </button>

      {hasTooltip &&
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

      {isModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-background w-full max-w-sm p-6 sm:p-8 rounded-3xl shadow-xl relative animate-fade-up flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-foreground/5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="relative h-16 w-20 mb-4">
                  <Image
                    src={badge.logo}
                    alt={badge.name}
                    fill
                    sizes="144px"
                    unoptimized
                    className="object-contain drop-shadow-sm"
                  />
                </div>
                <Text
                  size="xs"
                  transform="uppercase"
                  className="tracking-widest text-accent font-semibold mb-2"
                >
                  {typeLabel}
                </Text>
                <Heading level={4} className="mb-3 text-lg">
                  {badge.name}
                </Heading>
                {badge.description && (
                  <Text
                    size="sm"
                    className="text-foreground/80 leading-relaxed"
                  >
                    {badge.description}
                  </Text>
                )}
                {badge.link && (
                  <a
                    href={badge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonBase,
                      buttonVariants.primary,
                      'mt-6 gap-2 px-4 py-2 text-sm',
                    )}
                  >
                    Visit Page
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
