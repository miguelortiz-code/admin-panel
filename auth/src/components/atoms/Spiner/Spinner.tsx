import { cn } from '../../../utils/cn'

interface SpinnerProps {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className={cn(
      'h-6 w-6 animate-spin rounded-full border-2 border-violet-600 border-t-transparent',
      className
    )} />
  )
}