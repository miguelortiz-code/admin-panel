import { MOCK_ALERTS } from '../data/dashboard.mock'
import { cn } from '../../../utils/cn'
import type { AlertData } from '../../../types/dashboard.types'

const severityConfig: Record<AlertData['severity'], { label: string; className: string }> = {
  high:   { label: 'Alta',   className: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
  medium: { label: 'Media',  className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
  low:    { label: 'Baja',   className: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400' },
}

function getTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  if (minutes < 60) return `Hace ${minutes} min`
  return `Hace ${hours} h`
}

export function AlertsList() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Alertas pendientes
        </h3>
        <p className="text-xs text-slate-400">Requieren atención inmediata</p>
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-700"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {alert.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                {getTimeAgo(alert.createdAt)}
              </p>
            </div>
            <span className={cn(
              'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
              severityConfig[alert.severity].className
            )}>
              {severityConfig[alert.severity].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}