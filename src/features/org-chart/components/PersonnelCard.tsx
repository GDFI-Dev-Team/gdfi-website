'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import Text from '@/components/ui/text'
import { Personnel } from '../constants'

export function PersonnelCard({ person }: { person: Personnel }) {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)

  useEffect(() => {
    if (isMobileModalOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileModalOpen])

  return (
    <div className="group relative flex flex-col items-center w-full max-w-[140px] mx-auto">
      <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3 bg-foreground/10 border border-foreground/10 rounded-sm">
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 112px"
        />

        <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-4 w-64 p-4 bg-background border border-foreground/15 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] pointer-events-none">
          <Text size="sm" className="font-bold mb-1">
            {person.name}
          </Text>
          <Text size="sm" className="italic text-foreground/70 text-xs mb-3">
            {person.role}
          </Text>
          <p className="text-sm leading-relaxed text-foreground/80">
            {person.bio}
          </p>

          <div className="absolute top-1/2 -left-4 -translate-y-1/2 border-[8px] border-transparent border-r-background drop-shadow-sm" />
        </div>
      </div>

      <div className="text-center w-full">
        <Text size="sm" className="font-bold leading-tight">
          {person.name}
        </Text>
        <Text
          size="sm"
          className="italic text-foreground/70 text-xs mt-1 leading-tight"
        >
          {person.role}
        </Text>
      </div>

      <button
        onClick={() => setIsMobileModalOpen(true)}
        className="md:hidden mt-3 px-4 py-1.5 rounded-full bg-foreground/5 text-foreground hover:bg-foreground/10 text-xs font-semibold transition-colors"
      >
        Bio
      </button>

      {isMobileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4 md:hidden">
          <div className="bg-background w-full max-w-sm p-6 rounded-3xl shadow-xl relative animate-fade-up">
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-foreground/5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
              aria-label="Close bio"
            >
              <X size={20} />
            </button>
            <div className="mb-5 flex justify-center">
              <div className="relative w-24 h-24 bg-foreground/10 border border-foreground/10 rounded-sm">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <Text className="font-bold text-center text-lg">{person.name}</Text>
            <Text className="italic text-center text-foreground/70 mb-6">
              {person.role}
            </Text>
            <Text className="text-base leading-relaxed text-foreground/90">
              {person.bio}
            </Text>
          </div>
        </div>
      )}
    </div>
  )
}
