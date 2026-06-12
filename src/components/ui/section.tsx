import { cn } from '../../lib/utils'
type SectionMaxWidth = 'none' | 'full' | '2xl' | '4xl' | '5xl' | '6xl' | '7xl'

const maxWidthClasses: Record<SectionMaxWidth, string> = {
  none: 'max-w-none',
  full: 'max-w-full',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

export default function Section({
  children,
  sectionClassName,
  divClassName,
  id,
  'aria-labelledby': ariaLabelledBy,
  maxWidth = '7xl',
}: {
  children: React.ReactNode
  sectionClassName?: string
  divClassName?: string
  id?: string
  'aria-labelledby'?: string
  maxWidth?: SectionMaxWidth
}) {
  return (
    /* Change bg-white later */
    <section
      className={cn('px-(--gutter) py-16 md:py-24', sectionClassName)}
      id={id}
      aria-labelledby={ariaLabelledBy}
    >
      <div className={cn('mx-auto', maxWidthClasses[maxWidth], divClassName)}>
        {children}
      </div>
    </section>
  )
}
