import Banner from '@/components/ui/banner'
import ProgramsGrid from '@/features/programs/programs-grid'

export default function ProgramsPage() {
  return (
    <>
      <Banner
        title="Programs"
        description="Discover the different programs of Guiuan Development Foundation Inc. and how you can provide support."
        imgUrl="/feat-hero/hero-2.webp"
      />
      <ProgramsGrid />
    </>
  )
}
