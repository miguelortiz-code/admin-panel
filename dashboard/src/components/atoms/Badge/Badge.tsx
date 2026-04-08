import { cn } from '../../../utils/cn'

interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-slate-100 text-slate-700',
        variant === 'success' && 'bg-emerald-100 text-emerald-700',
        variant === 'warning' && 'bg-amber-100 text-amber-700',
        variant === 'danger'  && 'bg-red-100 text-red-700',
        variant === 'info'    && 'bg-violet-100 text-violet-700',
        className
      )}
    >
      {label}
    </span>
  )
}