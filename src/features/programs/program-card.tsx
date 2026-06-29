import Image from 'next/image'
import Link from 'next/link'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import { ArrowUpRight } from 'lucide-react'
import { Program } from '@/lib/interfaces/content'

const statusStyles: Record<string, string> = {
  completed: 'bg-status-completed',
  active: 'bg-status-ongoing',
  'on going': 'bg-status-discontinued',
}

export default function ProgramCard({
  article: program,
}: {
  article: Program
}) {
  const statusClass =
    statusStyles[program.status.toLowerCase()] ?? 'bg-primary-600'
  const href = `/programs/${program.slug}`

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link
        href={href}
        className="relative block aspect-4/3 w-full overflow-hidden bg-foreground/5"
      >
        <Image
          src={program['featured-img']}
          alt={program.title}
          sizes="(min-width: 768px) 50vw, 100vw"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <div className="flex gap-2 justify-start">
          <div className={`px-2 ${statusClass} text-center rounded-2xl`}>
            <Text size="sm" className="text-on-overlay">
              {program.status}
            </Text>
          </div>
          <div className="px-2 bg-foreground/20 text-center rounded-2xl">
            <Text size="sm">{program.tag}</Text>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3">
          <Link
            href={href}
            className="hover:underline decoration-foreground/30 underline-offset-4"
          >
            <Heading
              level={3}
              className="line-clamp-2 text-xl md:text-xl lg:text-2xl tracking-wider"
            >
              {program.title}
            </Heading>
          </Link>
          <ArrowUpRight className="size-8 shrink-0 text-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <Text className="text-foreground/60">
          {program['short-description']}
        </Text>
      </div>
    </article>
  )
}
