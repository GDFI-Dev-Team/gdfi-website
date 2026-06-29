'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { Personnel } from '../data/constants'

export function PersonnelCard({ person }: { person: Personnel }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative aspect-square w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-border transition-all duration-300 group-hover:ring-accent sm:w-14 md:w-16">
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <Text size="sm" className="font-bold leading-tight break-words">
            {person.name}
          </Text>
          <Text
            size="xs"
            className="mt-0.5 italic leading-tight text-foreground/60 break-words"
          >
            {person.role}
          </Text>
        </div>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-fade-up relative w-full max-w-sm rounded-3xl border border-border bg-background p-6 shadow-xl"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close bio"
              className="absolute right-4 top-4 rounded-full bg-foreground/5 p-2 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <X size={20} />
            </button>

            <div className="mb-4 flex justify-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-accent">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            </div>

            <Heading level={3} className="text-center">
              {person.name}
            </Heading>
            <Text
              size="sm"
              className="mb-5 mt-1 text-center italic text-accent"
            >
              {person.role}
            </Text>
            <Text size="sm" className="leading-relaxed text-foreground/80">
              {person.bio}
            </Text>
          </div>
        </div>
      )}
    </>
  )
}
