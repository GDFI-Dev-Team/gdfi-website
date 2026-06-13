'use client'

import { useState } from 'react'
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsToggled(!isToggled)}
    >
      <div
        className={cn(
          'absolute w-4 h-4 rounded-full bg-background border-[3px] transition-colors duration-300 z-10',
          'left-1/2 -translate-x-1/2',
          isOpen ? 'border-foreground bg-foreground' : 'border-foreground/30',
        )}
        style={{ top: '6px' }}
      />
      <div
        className={cn(
          'w-1/2 transition-transform duration-300',
          isEven ? 'pr-16 pl-0 text-right' : 'pl-16 ml-auto text-left',
        )}
      >
        <Text size="xl" className="font-bold text-foreground transition-colors">
          {milestone.year}
        </Text>
        <Heading level={3} className="text-2xl mt-1 mb-2">
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
                isEven ? 'ml-auto' : '',
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
      <Section maxWidth="5xl" sectionClassName="py-24">
        <Heading level={2} className="text-center mb-24">
          Our History
        </Heading>
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="absolute top-2 bottom-0 w-0.5 bg-foreground/15 left-1/2 -translate-x-1/2" />
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
