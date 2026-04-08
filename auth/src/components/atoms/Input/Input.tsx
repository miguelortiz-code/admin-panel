import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
          'placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-slate-200 hover:border-slate-300 focus:ring-violet-500',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'