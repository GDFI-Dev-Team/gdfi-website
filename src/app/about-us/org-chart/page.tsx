import {
  BoardOfTrustees,
  AdminAndFinance,
  ProjectCoordination,
  PoolOfVolunteers,
} from '@/features/org-chart/components'
import Section from '@/components/ui/section'
import Banner from '@/components/ui/banner'

export const metadata = {
  title: 'Organizational Structure | GDFI',
  description:
    'Meet the board of trustees, project coordinators, and volunteers dedicated to the Guiuan Development Foundation Inc.',
}

export default function OrganizationalStructurePage() {
  return (
    <main className="flex-1">
      <Banner
        title="Organizational Structure"
        description="The dedicated team and leadership driving our mission forward."
        imgUrl="/feat-hero/hero-2.webp"
      />

      <Section sectionClassName="pb-24">
        <div className="flex flex-col gap-16 md:gap-24 w-full">
          <BoardOfTrustees />
          <AdminAndFinance />
          <ProjectCoordination />
          <PoolOfVolunteers />
        </div>
      </Section>
    </main>
  )
}
