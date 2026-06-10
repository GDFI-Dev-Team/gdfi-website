'use client'

import Image from 'next/image'
import Text from '@/components/ui/text'
import { Personnel } from '../constants'

export function PersonnelCard({ person }: { person: Personnel }) {
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
    </div>
  )
}
