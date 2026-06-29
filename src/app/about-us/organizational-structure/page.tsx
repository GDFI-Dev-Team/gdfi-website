import {
  BoardOfTrustees,
  AdminAndFinance,
  ProjectCoordination,
  PoolOfVolunteers,
} from '@/features/about-us/org-chart/components'
import { getOrgStructure } from '@/lib/content/org-structure'
import Banner from '@/components/ui/banner'

export default function OrganizationalStructurePage() {
  const org = getOrgStructure()

  return (
    <>
      <Banner
        title="Organizational Structure"
        description="Meet the dedicated team and leadership driving our mission forward"
        imgUrl="/nav-item-banner-images/organizational-structure.webp"
      />

      <BoardOfTrustees personnel={org.boardOfTrustees} />
      <AdminAndFinance personnel={org.adminAndFinance} />
      <ProjectCoordination personnel={org.projectCoordination} />
      <PoolOfVolunteers personnel={org.poolOfVolunteers} />
    </>
  )
}
