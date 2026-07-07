'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X } from 'lucide-react'
import Text from '@/components/ui/text'
import { Personnel } from '@/lib/content/types'
import { cn } from '@/lib/utils/cn-merge'

export function PersonnelCard({ person }: { person: Personnel }) {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
  const [tooltipDirection, setTooltipDirection] = useState<'right' | 'left'>(
    'right',
  )
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobileModalOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileModalOpen])

  const handlePointerEnter = () => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const spaceOnRight = window.innerWidth - rect.right
    if (spaceOnRight < 400) setTooltipDirection('left')
    else setTooltipDirection('right')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsMobileModalOpen(true)
    }
  }

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onClick={() => setIsMobileModalOpen(true)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View bio of ${person.name}`}
      className="group relative flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex-row md:gap-5 md:p-4 md:text-left"
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-foreground/5 ring-1 ring-foreground/10 transition-shadow duration-300 group-hover:ring-accent/40 md:size-28">
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="scale-98 object-contain"
          sizes="(max-width: 768px) 64px, 112px"
        />
      </div>

      <div className="w-full min-w-0 md:flex-1">
        <Text className="text-sm font-bold leading-tight break-words md:text-lg">
          {person.name}
        </Text>
        <Text className="text-xs italic text-foreground/70 mt-0.5 leading-tight break-words md:mt-1 md:text-base">
          {person.role}
        </Text>
      </div>

      <div
        className={cn(
          'hidden md:flex flex-col absolute top-1/2 -translate-y-1/2 w-64 lg:w-80 xl:w-96 p-5 lg:p-6 bg-background border border-foreground/15 shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-60 pointer-events-auto',
          tooltipDirection === 'right' ? 'left-full ml-4' : 'right-full mr-4',
        )}
      >
        <Text size="sm" className="font-bold mb-1 lg:text-base xl:text-lg">
          {person.name}
        </Text>
        <Text
          size="sm"
          className="italic text-foreground/70 text-xs lg:text-sm mb-3 pb-3 border-b border-foreground/10"
        >
          {person.role}
        </Text>

        <div className="max-h-[40vh] overflow-y-auto overscroll-contain pr-2">
          <p className="text-sm lg:text-base leading-relaxed text-foreground/80 text-justify hyphens-auto whitespace-pre-line">
            {person.bio}
          </p>
        </div>

        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 border-8px border-transparent drop-shadow-sm pointer-events-none',
            tooltipDirection === 'right'
              ? '-left-4 border-r-background'
              : '-right-4 border-l-background',
          )}
        />
      </div>

      {isMobileModalOpen &&
        createPortal(
          <div
            onClick={(e) => {
              e.stopPropagation()
              setIsMobileModalOpen(false)
            }}
            role="presentation"
            className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4"
          >
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full max-w-[800vw] sm:max-w-md p-6 sm:p-8 rounded-3xl shadow-xl relative animate-fade-up flex flex-col max-h-[85vh]"
            >
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-foreground/5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary/50"
                aria-label="Close bio"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <div className="shrink-0 flex flex-col items-center">
                <div className="relative mb-4 size-20 overflow-hidden rounded-full bg-foreground/5 ring-1 ring-foreground/10 sm:size-24">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="scale-90 object-contain"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                </div>

                <Text className="font-bold text-center text-lg">
                  {person.name}
                </Text>
                <Text className="italic text-center text-sm sm:text-base text-foreground/70 mb-4 pb-4 border-b border-foreground/10 w-full">
                  {person.role}
                </Text>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-2">
                <Text className="text-sm sm:text-base leading-relaxed text-foreground/90 text-justify hyphens-auto whitespace-pre-line">
                  {person.bio}
                </Text>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
