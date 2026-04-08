import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  rightElement?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, rightElement, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          ref={ref}
          className={cn(
            'flex h-9 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
            'placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            rightElement && 'pr-10',
            error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-slate-200 hover:border-slate-300 focus:ring-violet-500',
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'