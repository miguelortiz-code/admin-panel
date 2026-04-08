import { type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

interface KpiCardProps {
  title: string
  value: string | number
  delta?: number
  icon?: ReactNode
  className?: string
}

export function KpiCard({ title, value, delta, icon, className }: KpiCardProps) {
  const isPositive = delta !== undefined && delta >= 0

  return (
    <div className={cn(
      'rounded-xl border border-slate-200 bg-white p-5 shadow-sm',
      className
    )}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {icon && (
          <span className="rounded-lg bg-violet-50 p-2 text-violet-600">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
      {delta !== undefined && (
        <p className={cn(
          'mt-1 flex items-center gap-1 text-xs font-medium',
          isPositive ? 'text-emerald-600' : 'text-red-500'
        )}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(delta)}% vs. mes anterior</span>
        </p>
      )}
    </div>
  )
}