import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import AnnualReportsShell from '@/features/resources/components/ar-shell'
import { getCollectionMarkdownData } from '@/lib/markdown'
import { AnnualReport } from '@/features/resources/components/ar-grid'

export default function AnnualReportsPage() {
  const reports = getCollectionMarkdownData<Omit<AnnualReport, 'slug'>>(
    'resources/annual-reports',
  ).sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <main className="flex-1 flex flex-col bg-foreground/3">
      <Banner
        title="Annual Reports"
        description="Browse and download GDFI's yearly transparency reports."
        imgUrl="/feat-hero/hero-2.webp"
      />
      <Section>
        <AnnualReportsShell reports={reports} />
      </Section>
    </main>
  )
}
