import Heading from '@/components/ui/heading'
import { PersonnelCard } from './personnel-card'
import { Personnel } from '../data/types'

function OrgSectionContainer({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-foreground/4 rounded-3xl p-6 md:p-10 lg:p-16 w-full flex flex-col items-center">
      <Heading level={2} className="mb-6 text-center">
        {title}
      </Heading>
      {children}
    </div>
  )
}

export function BoardOfTrustees({ personnel }: { personnel: Personnel[] }) {
  const president = personnel[0]
  const vicePresident = personnel[1]
  const officers = personnel.slice(2, 4)
  const members = personnel.slice(4)

  return (
    <OrgSectionContainer title="Board of Trustees">
      <div className="flex flex-col items-center gap-10 md:gap-14 w-full">
        {president && <PersonnelCard person={president} />}
        {vicePresident && <PersonnelCard person={vicePresident} />}

        {officers.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-3xl px-4">
            {officers.map((p, i) => (
              <PersonnelCard key={`${p.name}-${i}`} person={p} />
            ))}
          </div>
        )}

        {members.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl">
            {members.map((p, i) => (
              <PersonnelCard key={`${p.name}-${i}`} person={p} />
            ))}
          </div>
        )}
      </div>
    </OrgSectionContainer>
  )
}

export function AdminAndFinance({ personnel }: { personnel: Personnel[] }) {
  return (
    <OrgSectionContainer title="Admin and Finance">
      <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 w-full max-w-5xl">
        {personnel.map((p, i) => (
          <PersonnelCard key={`${p.name}-${i}`} person={p} />
        ))}
      </div>
    </OrgSectionContainer>
  )
}

export function ProjectCoordination({ personnel }: { personnel: Personnel[] }) {
  return (
    <OrgSectionContainer title="Project Coordination">
      <div className="flex flex-wrap justify-center gap-y-10 md:gap-y-16 gap-x-6 md:gap-x-12 w-full max-w-5xl">
        {personnel.map((p, i) => (
          <PersonnelCard key={`${p.name}-${i}`} person={p} />
        ))}
      </div>
    </OrgSectionContainer>
  )
}

export function PoolOfVolunteers({ personnel }: { personnel: Personnel[] }) {
  return (
    <OrgSectionContainer title="Pool of Volunteers">
      <div className="flex flex-wrap justify-center gap-y-10 md:gap-y-16 gap-x-6 md:gap-x-12 w-full max-w-5xl">
        {personnel.map((p, i) => (
          <PersonnelCard key={`${p.name}-${i}`} person={p} />
        ))}
      </div>
    </OrgSectionContainer>
  )
}
