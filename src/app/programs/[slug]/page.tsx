import Image from 'next/image'
import { notFound } from 'next/navigation'
import Heading from '@/components/ui/heading'
import Text from '@/components/ui/text'
import Section from '@/components/ui/section'
import { getSingleMarkdownData } from '@/lib/markdown'
import { Program } from '@/features/programs/programs-grid'

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

  return (
    <Section>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src="/feat-hero/hero-2.webp"
          alt={program.title}
          fill
          className="object-cover"
        />
      </div>
      <Heading level={1} className="mt-6">
        {program.title}
      </Heading>
      <div className="flex gap-2 mt-2">
        <Text size="sm" className="px-2 bg-foreground/20 rounded-2xl">
          {program.status}
        </Text>
        <Text size="sm" className="px-2 bg-foreground/20 rounded-2xl">
          {program.tag}
        </Text>
      </div>
      <Text className="mt-4">{program['short-description']}</Text>
    </Section>
  )
}
