'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { HISTORY_MILESTONES, HistoryMilestone } from '../data/constants'
import { cn } from '@/lib/utils'

function TimelineItem({
  milestone,
  isEven,
}: {
  milestone: HistoryMilestone
  isEven: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const isOpen = isHovered || isToggled

  return (
    <div
      className="relative flex w-full group mb-12 last:mb-0 cursor-pointer"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setIsHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setIsHovered(false)}
      onClick={() => setIsToggled((prev) => !prev)}
    >
      <div
        className={cn(
          'absolute flex items-center justify-center w-7 h-7 rounded-full border-[3px] transition-colors duration-300 z-10',
          'left-[14px] -translate-x-1/2 md:left-1/2',
          isOpen
            ? 'border-foreground bg-foreground'
            : 'border-foreground/30 bg-background',
        )}
        style={{ top: '2px' }}
      >
        {isOpen ? (
          <Minus size={14} strokeWidth={3} className="text-background" />
        ) : (
          <Plus
            size={14}
            strokeWidth={3}
            className="text-foreground/50 transition-colors group-hover:text-foreground/80"
          />
        )}
      </div>

      <div
        className={cn(
          'w-full pl-14 md:w-1/2 transition-transform duration-300',
          isEven
            ? 'md:pr-16 md:pl-0 md:text-right'
            : 'md:pl-16 md:ml-auto md:text-left',
        )}
      >
        <Text size="xl" className="font-bold text-foreground transition-colors">
          {milestone.year}
        </Text>
        <Heading level={3} className="text-xl md:text-2xl mt-1 mb-2">
          {milestone.title}
        </Heading>

        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <Text
              size="md"
              className={cn(
                'italic text-foreground/75 leading-relaxed pt-2 pb-4 whitespace-pre-line',
                isEven ? 'md:ml-auto' : '',
              )}
            >
              {milestone.description}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HistoryTimeline() {
  return (
    <div className="bg-foreground/[0.02]">
      <Section maxWidth="5xl" sectionClassName="py-16 md:py-24">
        <Heading level={2} className="text-center mb-16 md:mb-24">
          Our History
        </Heading>

        <div className="relative w-full max-w-4xl mx-auto">
          <div className="absolute top-2 bottom-0 w-0.5 bg-foreground/15 left-[14px] -translate-x-1/2 md:left-1/2" />

          <div className="flex flex-col w-full">
            {HISTORY_MILESTONES.map((milestone, i) => (
              <TimelineItem
                key={milestone.id}
                milestone={milestone}
                isEven={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}
