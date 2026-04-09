import { cn } from '../../../utils/cn'

interface KpiCardProps {
  title: string
  value: string | number
  delta: number
  icon: string
  className?: string
}

function KpiIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    spa: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    revenue: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    occupancy: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    alert: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  }

  return <>{icons[icon] ?? null}</>
}

const iconColors: Record<string, string> = {
  spa:       'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
  revenue:   'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
  occupancy: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  alert:     'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
}

export function KpiCard({ title, value, delta, icon, className }: KpiCardProps) {
  const isPositive = delta >= 0

  return (
    <div className={cn(
      'rounded-xl border border-slate-200 bg-white p-5 shadow-sm',
      'dark:border-slate-700 dark:bg-slate-800',
      className
    )}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <span className={cn(
          'rounded-lg p-2',
          iconColors[icon] ?? 'bg-slate-100 text-slate-600'
        )}>
          <KpiIcon icon={icon} />
        </span>
      </div>

      <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </p>

      <div className={cn(
        'mt-2 flex items-center gap-1 text-xs font-medium',
        isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
      )}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(isPositive ? 'rotate-0' : 'rotate-180')}
        >
          <polyline points="18 15 12 9 6 15"/>
        </svg>
        <span>{Math.abs(delta)}% vs. mes anterior</span>
      </div>
    </div>
  )
}