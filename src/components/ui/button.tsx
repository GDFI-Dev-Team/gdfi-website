import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

/* Reusable for buttons, anchors for primary, secondary, and ghost classnames */
export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-btn-primary text-white shadow-sm hover:bg-btn-primary-hover active:scale-95',
  secondary:
    'border border-btn-secondary text-btn-secondary hover:bg-btn-secondary/10 active:scale-95',
  ghost: 'text-foreground hover:bg-foreground/5',
}

export const buttonBase =
  'inline-flex items-center justify-center rounded-lg transition-colors'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export default function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonBase, buttonVariants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
