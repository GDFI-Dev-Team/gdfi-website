import Heading from '@/components/ui/heading'
import { PersonnelCard } from './PersonnelCard'
import {
  BOARD_OF_TRUSTEES,
  ADMIN_AND_FINANCE,
  PROJECT_COORDINATION,
  VOLUNTEERS,
} from '../data/constants'

function OrgSectionContainer({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-foreground/[0.04] rounded-3xl p-6 md:p-10 lg:p-16 w-full flex flex-col items-center">
      <Heading
        level={2}
        className="text-xl md:text-2xl mb-10 md:mb-16 text-center"
      >
        {title}
      </Heading>
      {children}
    </div>
  )
}

export function BoardOfTrustees() {
  const tier1 = BOARD_OF_TRUSTEES[0] // President
  const tier2 = BOARD_OF_TRUSTEES[1] // Vice Preseidnt
  const tier3 = BOARD_OF_TRUSTEES.slice(2, 4) // Secretary & Treasurer
  const tier4 = BOARD_OF_TRUSTEES.slice(4, 8) // 4 Other Members

  return (
    <OrgSectionContainer title="Board of Trustees">
      <div className="flex flex-col items-center gap-10 md:gap-14 w-full">
        <PersonnelCard person={tier1} />
        <PersonnelCard person={tier2} />

        <div className="flex w-full justify-around max-w-3xl px-4">
          {tier3.map((p) => (
            <PersonnelCard key={p.id} person={p} />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 w-full max-w-5xl">
          {tier4.map((p) => (
            <PersonnelCard key={p.id} person={p} />
          ))}
        </div>
      </div>
    </OrgSectionContainer>
  )
}

export function AdminAndFinance() {
  return (
    <OrgSectionContainer title="Admin and Finance">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full max-w-5xl">
        {ADMIN_AND_FINANCE.map((p) => (
          <PersonnelCard key={p.id} person={p} />
        ))}
      </div>
    </OrgSectionContainer>
  )
}

export function ProjectCoordination() {
  const row1 = PROJECT_COORDINATION.slice(0, 5) // First 5
  const row2 = PROJECT_COORDINATION.slice(5, 8) // Last 3

  return (
    <OrgSectionContainer title="Project Coordination">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 md:gap-y-16 gap-x-4 w-full max-w-6xl">
        {row1.map((p) => (
          <div key={p.id} className="col-span-1">
            <PersonnelCard person={p} />
          </div>
        ))}
        <div className="col-span-1 md:col-start-2">
          <PersonnelCard person={row2[0]} />
        </div>
        <div className="col-span-1 md:col-start-3">
          <PersonnelCard person={row2[1]} />
        </div>
        <div className="col-span-1 md:col-start-4">
          <PersonnelCard person={row2[2]} />
        </div>
      </div>
    </OrgSectionContainer>
  )
}

export function PoolOfVolunteers() {
  const row1 = VOLUNTEERS.slice(0, 5) // First 5
  const row2 = VOLUNTEERS.slice(5, 9) // Last 4

  return (
    <OrgSectionContainer title="Pool of Volunteers">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 md:gap-y-16 gap-x-4 w-full max-w-6xl">
        {row1.map((p) => (
          <div key={p.id} className="col-span-1">
            <PersonnelCard person={p} />
          </div>
        ))}
        {row2.map((p) => (
          <div key={p.id} className="col-span-1">
            <PersonnelCard person={p} />
          </div>
        ))}
      </div>
    </OrgSectionContainer>
  )
}
