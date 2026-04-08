import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'ghost'
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth = false, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variant === 'primary' && 'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500',
          variant === 'ghost' && 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400',
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