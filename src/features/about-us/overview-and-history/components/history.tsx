'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  HISTORY_MILESTONES,
  HistoryMilestone,
} from '../data/overview-and-history'
import { cn } from '@/lib/utils/cn-merge'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'

function TimelineItem({
  milestone,
  isOpen,
  isLast,
  onToggle,
}: {
  milestone: HistoryMilestone
  isOpen: boolean
  isLast: boolean
  onToggle: () => void
}) {
  return (
    <div className="group/item flex gap-4 md:gap-6">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            'mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 md:mt-1.5 md:size-5',
            isOpen
              ? 'border-accent bg-accent'
              : 'border-foreground/25 bg-background group-hover/item:border-accent',
          )}
        >
          <span
            className={cn(
              'size-1.5 rounded-full transition-colors duration-300 md:size-2',
              isOpen
                ? 'bg-background'
                : 'bg-foreground/30 group-hover/item:bg-accent',
            )}
          />
        </span>
        {!isLast && <span className="mt-2 w-px grow bg-foreground/15" />}
      </div>

      {/* Content */}
      <div className={cn('flex-1', isLast ? 'pb-0' : 'pb-12')}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="block w-full cursor-pointer text-left"
        >
          <span className="block font-display text-xl font-bold leading-none text-accent md:text-4xl">
            {milestone.year}
          </span>

          <div className="mt-3 flex items-center gap-2">
            <Heading level={4} className="text-sm md:text-xl">
              {milestone.title}
            </Heading>
            <ChevronDown
              className={cn(
                'size-5 shrink-0 text-foreground/40 transition-all duration-300 group-hover/item:text-foreground/70 md:size-6',
                isOpen && 'rotate-180',
              )}
            />
          </div>
        </button>

        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isOpen
              ? 'mt-3 grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <Text
              size="sm"
              className="leading-relaxed text-foreground/75 whitespace-pre-line sm:text-base"
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
  const [openId, setOpenId] = useState<string | null>(
    HISTORY_MILESTONES[0]?.id ?? null,
  )

  return (
    <Section sectionClassName="bg-foreground/[0.02]">
      <Heading level={2} className="mb-8 text-center md:mb-12 md:text-left">
        Our History
      </Heading>

      <div className="relative max-w-3xl">
        <div className="flex flex-col">
          {HISTORY_MILESTONES.map((milestone, index) => (
            <TimelineItem
              key={milestone.id}
              milestone={milestone}
              isOpen={openId === milestone.id}
              isLast={index === HISTORY_MILESTONES.length - 1}
              onToggle={() =>
                setOpenId((prev) =>
                  prev === milestone.id ? null : milestone.id,
                )
              }
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
