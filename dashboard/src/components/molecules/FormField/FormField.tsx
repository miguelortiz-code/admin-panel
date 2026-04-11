import { type ReactNode } from 'react'
import { Label } from '../../atoms/Label'
import { cn } from '../../../utils/cn'

interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({ id, label, required, error, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}