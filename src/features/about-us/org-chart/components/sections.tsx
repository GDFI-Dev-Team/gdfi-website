import Heading from '@/components/ui/heading'
import { PersonnelCard } from './personnel-card'
import {
  BOARD_OF_TRUSTEES,
  ADMIN_AND_FINANCE,
  PROJECT_COORDINATION,
  VOLUNTEERS,
  Personnel,
} from '../data/constants'

function OrgSectionContainer({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="w-full rounded-xl border border-border bg-surface/60 p-4 md:p-10 lg:p-14">
      <Heading level={2} className="mb-6 text-center md:mb-12">
        {title}
      </Heading>
      {children}
    </div>
  )
}

/* Horizontal person rows that wrap and stay centered — an incomplete last
   row centers its items instead of left-aligning (flex + justify-center). */
function PeopleGrid({
  people,
  maxWidth = 'max-w-5xl',
}: {
  people: Personnel[]
  maxWidth?: string
}) {
  return (
    <div
      className={`mx-auto flex w-full flex-wrap justify-center gap-x-6 gap-y-2 md:gap-y-4 ${maxWidth}`}
    >
      {people.map((p) => (
        <div key={p.id} className="w-full sm:w-64 md:w-72">
          <PersonnelCard person={p} />
        </div>
      ))}
    </div>
  )
}

export function BoardOfTrustees() {
  const leadership = BOARD_OF_TRUSTEES.slice(0, 2) // President & Vice President
  const rest = BOARD_OF_TRUSTEES.slice(2, 8) // Officers & Members

  return (
    <OrgSectionContainer title="Board of Trustees">
      <div className="flex w-full flex-col items-center gap-6 md:gap-8">
        <PeopleGrid people={leadership} maxWidth="max-w-3xl" />
        <PeopleGrid people={rest} />
      </div>
    </OrgSectionContainer>
  )
}

export function AdminAndFinance() {
  return (
    <OrgSectionContainer title="Admin and Finance">
      <PeopleGrid people={ADMIN_AND_FINANCE} />
    </OrgSectionContainer>
  )
}

export function ProjectCoordination() {
  return (
    <OrgSectionContainer title="Project Coordination">
      <PeopleGrid people={PROJECT_COORDINATION} />
    </OrgSectionContainer>
  )
}

export function PoolOfVolunteers() {
  return (
    <OrgSectionContainer title="Pool of Volunteers">
      <PeopleGrid people={VOLUNTEERS} />
    </OrgSectionContainer>
  )
}
