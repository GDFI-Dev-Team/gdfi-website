import {
  BoardOfTrustees,
  AdminAndFinance,
  ProjectCoordination,
  PoolOfVolunteers,
} from '@/features/about-us/org-chart/components'
import { getOrgStructure } from '@/lib/content/org-structure'
import Section from '@/components/ui/section'
import Banner from '@/components/ui/banner'

export default function OrganizationalStructurePage() {
  const org = getOrgStructure()

  return (
    <>
      <Banner
        title="Organizational Structure"
        description="Meet the dedicated team and leadership driving our mission forward"
        imgUrl="/nav-item-banner-images/organizational-structure.jpeg"
      />

      <Section sectionClassName="pb-24">
        <div className="flex flex-col gap-16 md:gap-24 w-full">
          <BoardOfTrustees personnel={org['board-of-trustees']} />
          <AdminAndFinance personnel={org['admin-and-finance']} />
          <ProjectCoordination personnel={org['project-coordination']} />
          <PoolOfVolunteers personnel={org['pool-of-volunteers']} />
        </div>
      </Section>
    </>
  )
}
