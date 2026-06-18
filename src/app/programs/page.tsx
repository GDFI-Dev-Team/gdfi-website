import Banner from '@/components/ui/banner'
import ProgramsGrid, { Program } from '@/features/programs/programs-grid'
import { getCollectionMarkdownData } from '@/lib/markdown'

export default function ProgramsPage() {
  const programs = getCollectionMarkdownData<Omit<Program, 'slug'>>('programs/')
  return (
    <>
      <Banner
        title="Programs"
        description="Discover the different programs of Guiuan Development Foundation Inc. and how you can provide support."
        imgUrl="/feat-hero/hero-2.webp"
      />
      <ProgramsGrid programs={programs} />
    </>
  )
}
