import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import PublicationList from '@/features/research/publications/components/pub-list'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { Publication } from '@/features/research/publications/components/pub-list'

export const metadata = {
  title: 'Publications | GDFI',
  description:
    'Research, studies, and findings from our work across the ridge-to-reef ecosystems of Eastern Samar.',
}

export default function PublicationsPage() {
  const publications = getCollectionMarkdownData<Omit<Publication, 'slug'>>(
    'research/publications',
  ).sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <main className="flex-1 flex flex-col bg-foreground/3">
      <Banner
        title="Publications"
        description="Research, studies, and findings from our work across the ridge-to-reef ecosystems of Eastern Samar."
        imgUrl="/nav-item-banner-images/publications.webp"
      />

      <Section>
        <PublicationList publications={publications} />
      </Section>
    </main>
  )
}
