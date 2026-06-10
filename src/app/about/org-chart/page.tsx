import {
  BoardOfTrustees,
  AdminAndFinance,
  ProjectCoordination,
  PoolOfVolunteers,
} from '@/features/org-chart/components'
import Heading from '@/components/ui/heading'
import Section from '@/components/ui/section'
import Text from '@/components/ui/text'

export const metadata = {
  title: 'Organizational Structure | GDFI',
  description:
    'Meet the board of trustees, project coordinators, and volunteers dedicated to the Guiuan Development Foundation Inc.',
}

export default function OrganizationalStructurePage() {
  return (
    <main className="flex-1 pt-24 md:pt-32 pb-16">
      <Section maxWidth="5xl" className="pb-8 pt-12 md:pb-12 text-center">
        <Heading level={1} className="mb-4">
          Organizational Structure
        </Heading>
        <Text size="xl" className="text-foreground/80 max-w-2xl mx-auto">
          The dedicated team and leadership driving our mission forward.
        </Text>
      </Section>

      <Section maxWidth="7xl" className="pb-24">
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
