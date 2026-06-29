import Image from 'next/image'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Program } from '@/lib/content/types'

const statusStyles: Record<string, string> = {
  completed: 'bg-status-completed',
  active: 'bg-status-ongoing',
  discontinued: 'bg-status-discontinued',
  'on going': 'bg-status-discontinued',
}

export default function ProgramCard({
  article: program,
}: {
  article: Program
}) {
  const statusClass =
    statusStyles[program.status.toLowerCase()] ?? 'bg-primary-600'
  const href = `/our-works/programs-and-projects/${program.slug}`

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link
        href={href}
        className="relative block aspect-4/3 w-full overflow-hidden bg-foreground/5"
      >
        <Image
          src={program['featured-img']}
          alt={program.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 md:p-6">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          <span className={`px-2 ${statusClass} rounded-2xl`}>
            <Text size="sm" className="text-on-overlay text-xs md:text-sm">
              {program.status}
            </Text>
          </span>
          {program.tag && (
            <span className="px-2 bg-foreground/20 rounded-2xl">
              <Text size="sm" className="text-xs md:text-sm">
                {program.tag}
              </Text>
            </span>
          )}
        </div>

        <div className="mt-0.5 flex items-start justify-between gap-2 md:mt-1 md:gap-3">
          <Link
            href={href}
            className="hover:underline decoration-foreground/30 underline-offset-4"
          >
            <Heading
              level={3}
              className="line-clamp-3 text-sm md:line-clamp-2 md:text-xl lg:text-xl"
            >
              {program.title}
            </Heading>
          </Link>
          <ArrowUpRight className="hidden size-7 shrink-0 text-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block" />
        </div>

        {program.timeline && (
          <div className="hidden items-center gap-1.5 text-foreground/55 md:flex">
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
            <Text size="sm">{program.timeline}</Text>
          </div>
        )}

        <Text className="mt-0.5 line-clamp-2 text-xs text-foreground/60 md:mt-1 md:line-clamp-3 md:text-base">
          {program['short-description']}
        </Text>
      </div>
    </article>
  )
}
