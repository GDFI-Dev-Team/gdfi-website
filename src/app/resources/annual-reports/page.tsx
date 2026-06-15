'use client'
import dynamic from 'next/dynamic'
import Banner from '@/components/ui/banner'
import Section from '@/components/ui/section'
import AnnualReportGrid from '@/features/resources/components/ar-grid'

const PDFViewer = dynamic(
  () => import('@/features/resources/components/pdf-viewer'),
  { ssr: false },
)

export default function News() {
  return (
    <main className="flex-1 flex flex-col bg-foreground/3">
      <Banner
        title="Annual Reports"
        description="Browse and download GDFI's yearly transparency reports."
        imgUrl="/feat-hero/hero-2.webp"
      />
      <Section
        sectionClassName="flex-1 flex flex-col py-8"
        divClassName="flex flex-wrap items-center gap-10"
      >
        <div className="min-w-0 basis-full md:basis-[calc(50%-1.25rem)]">
          <AnnualReportGrid />
        </div>
        <div className="min-w-0 basis-full md:basis-[calc(50%-1.25rem)]">
          <PDFViewer />
        </div>
      </Section>
    </main>
  )
}
