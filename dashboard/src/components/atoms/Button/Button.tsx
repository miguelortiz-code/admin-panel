import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variant === 'primary'     && 'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500',
          variant === 'secondary'   && 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400',
          variant === 'ghost'       && 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400',
          variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
          variant === 'outline'     && 'border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
          size === 'sm'   && 'h-8 px-3 text-xs',
          size === 'md'   && 'h-9 px-4 text-sm',
          size === 'lg'   && 'h-11 px-6 text-base',
          size === 'icon' && 'h-9 w-9',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'