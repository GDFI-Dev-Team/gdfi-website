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

  return (
    <Link href={`/programs/${program.slug}`} className="group block">
      <div className="relative aspect-4/3">
        <div className="absolute inset-0 rounded-lg bg-card-highlight transition-transform duration-300 group-hover:-rotate-3 group-focus-visible:rotate-2" />
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <Image
            src={program['featured-img']}
            alt={program.title}
            sizes="(min-width: 768px) 50vw, 100vw"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
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

        <div className="flex items-end justify-between gap-3">
          <Heading
            level={3}
            className="line-clamp-2 text-xl md:text-xl lg:text-2xl tracking-wider"
          >
            {program.title}
          </Heading>
          <ArrowUpRight className="size-10 shrink-0" />
        </div>
        <Text>{program['short-description']}</Text>
      </div>
    </Link>
  )
}
