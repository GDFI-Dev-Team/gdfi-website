import Image from 'next/image'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import html from 'remark-html'
import { getSingleMarkdownData } from '@/lib/markdown'
import { Program } from '@/lib/interfaces/content'
import { remark } from 'remark'
import { notFound } from 'next/navigation'

const statusStyles: Record<string, string> = {
  completed: 'bg-status-completed',
  active: 'bg-status-ongoing',
  'on going': 'bg-status-discontinued',
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let program: Program
  try {
    program = getSingleMarkdownData<Program>('programs', `${slug}.md`)
  } catch {
    notFound()
  }

  const processedContent = await remark().use(html).process(program.body)
  const contentHtml = processedContent.toString()
  const statusClass =
    statusStyles[program.status.toLowerCase()] ?? 'bg-foreground/20'

  return (
    <Section maxWidth="4xl" sectionClassName="pt-28 md:pt-32">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={program['featured-img']}
          alt={program.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <Heading level={1} className="mt-6">
        {program.title}
      </Heading>

      <div className="flex gap-2 mt-3">
        <span className={`px-2 rounded-2xl ${statusClass}`}>
          <Text size="sm" className="text-on-overlay">
            {program.status}
          </Text>
        </span>
        <span className="px-2 rounded-2xl bg-foreground/20">
          <Text size="sm">{program.tag}</Text>
        </span>
      </div>

      <article
        className="prose lg:prose-xl mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </Section>
  )
}
