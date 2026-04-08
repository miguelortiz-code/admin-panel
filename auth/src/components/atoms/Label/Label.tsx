import { type LabelHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium text-slate-700',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  )
}