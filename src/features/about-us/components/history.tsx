'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { HISTORY_MILESTONES, HistoryMilestone } from '../data/constants'
import { cn } from '@/lib/utils/cn-merge'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'

// GDFI was founded in 1988; the legacy count below derives from this so it
// stays current automatically as years pass.
const FOUNDED = 1988

function TimelineItem({
  milestone,
  isOpen,
  onToggle,
}: {
  milestone: HistoryMilestone
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="group/item relative pb-12 pl-12 last:pb-0 md:pl-16">
      <span
        className={cn(
          'absolute left-3 top-2 flex size-4 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-colors duration-300 md:left-3.5 md:size-5',
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
  )
}

export function HistoryTimeline() {
  // Accordion: one milestone open at a time; first is open by default.
  const [openId, setOpenId] = useState<string | null>(
    HISTORY_MILESTONES[0]?.id ?? null,
  )

  const yearsOfLegacy = new Date().getFullYear() - FOUNDED

  return (
    <div className="bg-foreground/[0.02]">
      <Section maxWidth="5xl" sectionClassName="py-16 md:py-24">
        <Heading level={2} className="mb-12 text-center md:mb-16">
          Our History
        </Heading>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute top-2 bottom-2 left-3 w-px bg-foreground/15 md:left-3.5" />

          <div className="flex flex-col">
            {HISTORY_MILESTONES.map((milestone) => (
              <TimelineItem
                key={milestone.id}
                milestone={milestone}
                isOpen={openId === milestone.id}
                onToggle={() =>
                  setOpenId((prev) =>
                    prev === milestone.id ? null : milestone.id,
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Closing stat — dynamic legacy count */}
        <div className="mx-auto mt-14 max-w-2xl pt-5 text-center md:mt-20 md:pt-14">
          <Text size="sm" className="text-foreground/70 md:text-lg">
            <span className="align-middle font-display text-2xl font-bold leading-none text-accent md:text-4xl">
              {yearsOfLegacy}+
            </span>
            {'  '}
            <em>years of coastal conservation in Eastern Samar</em>
          </Text>
        </div>
      </Section>
    </div>
  )
}
