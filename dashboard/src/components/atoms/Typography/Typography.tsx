import { cn } from '../../../utils/cn'
import { type ReactNode } from 'react'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn('text-2xl font-semibold text-slate-900', className)}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn('text-xl font-semibold text-slate-900', className)}>
      {children}
    </h2>
  )
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn('text-base font-semibold text-slate-900', className)}>
      {children}
    </h3>
  )
}

export function Text({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-sm text-slate-600', className)}>
      {children}
    </p>
  )
}

export function Muted({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-xs text-slate-400', className)}>
      {children}
    </p>
  )
}