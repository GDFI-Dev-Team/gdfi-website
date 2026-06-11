import { cn } from '../../lib/utils'

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const transformClasses = {
  none: '',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
}

export default function Text({
  size = 'md',
  transform = 'none',
  className,
  children,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  transform?: 'none' | 'uppercase' | 'lowercase'
  className?: string
  children: React.ReactNode
}) {
  return (
    <p
      className={cn(sizeClasses[size], transformClasses[transform], className)}
    >
      {children}
    </p>
  )
}
