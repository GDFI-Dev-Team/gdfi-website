import Heading from '@/components/ui/heading'
import Section from '@/components/ui/section'
import { PersonnelCard } from './personnel-card'
import { Personnel } from '../data/types'

function OrgSection({
  title,
  tinted = false,
  children,
}: {
  title: string
  tinted?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={tinted ? 'bg-foreground/[0.02]' : undefined}>
      <Section maxWidth="6xl" sectionClassName="py-14 md:py-20">
        <div className="mb-10 text-center md:mb-14">
          <Heading level={2}>{title}</Heading>
        </div>
        {children}
      </Section>
    </div>
  )
}

function PeopleGrid({
  people,
  maxWidth = 'max-w-4xl',
  columns = 2,
}: {
  people: Personnel[]
  maxWidth?: string
  columns?: 1 | 2
}) {
  const slot =
    columns === 1
      ? 'w-full max-w-xs md:w-96 md:max-w-none'
      : 'w-[calc(50%-0.5rem)] md:w-96'

  return (
    <div
      className={`mx-auto flex w-full flex-wrap justify-center gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-6 ${maxWidth}`}
    >
      {people.map((p, i) => (
        <div key={`${p.name}-${i}`} className={slot}>
          <PersonnelCard person={p} />
        </div>
      ))}
    </div>
  )
}

export function BoardOfTrustees({ personnel }: { personnel: Personnel[] }) {
  const leadership = personnel.slice(0, 2) // President & Vice President
  const rest = personnel.slice(2) // Officers & Members

  return (
    <OrgSection title="Board of Trustees">
      <div className="flex w-full flex-col items-center gap-4 md:gap-6">
        <PeopleGrid people={leadership} maxWidth="max-w-md" columns={1} />
        {rest.length > 0 && <PeopleGrid people={rest} />}
      </div>
    </OrgSection>
  )
}

export function AdminAndFinance({ personnel }: { personnel: Personnel[] }) {
  return (
    <OrgSection title="Admin and Finance" tinted>
      <PeopleGrid people={personnel} />
    </OrgSection>
  )
}

export function ProjectCoordination({ personnel }: { personnel: Personnel[] }) {
  return (
    <OrgSection title="Project Coordination">
      <PeopleGrid people={personnel} />
    </OrgSection>
  )
}

export function PoolOfVolunteers({ personnel }: { personnel: Personnel[] }) {
  return (
    <OrgSection title="Pool of Volunteers" tinted>
      <PeopleGrid people={personnel} />
    </OrgSection>
  )
}
