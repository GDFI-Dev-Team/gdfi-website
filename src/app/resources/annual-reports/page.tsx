import Banner from '@/components/ui/banner'
import AnnualReportGrid from '@/features/resources/components/ar-grid'
import Section from '@/components/ui/section'
import PDFViewer from '@/features/resources/components/pdf-viewer'

export default function News() {
  return (
    <main className="flex-1 bg-foreground/3">
      <Banner
        title="Annual Reports"
        description="Browse and download GDFI's yearly transparency reports."
        imgUrl="/feat-hero/hero-2.webp"
      />
      <Section divClassName="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10">
        <AnnualReportGrid />
        <PDFViewer />
      </Section>
    </main>
  )
}
