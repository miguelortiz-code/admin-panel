import { type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

interface AuthCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function AuthCard({ title, subtitle, children, className }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div
        className={cn(
          'w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm',
          className
        )}
      >
        {/* Logo / Header */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">
            <span className="text-xl font-bold text-white">S</span>
          </div>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        {children}

      </div>
    </div>
  )
}