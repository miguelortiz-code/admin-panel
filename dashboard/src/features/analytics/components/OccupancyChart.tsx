import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { MOCK_SPA_ACTIVITY } from '../data/dashboard.mock'
import { useUIStore } from '../../../store/ui.store'

export function OccupancyChart() {
  const { isDarkMode } = useUIStore()

  const textColor = isDarkMode ? '#94a3b8' : '#64748b'
  const gridColor = isDarkMode ? '#1e293b' : '#f1f5f9'

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Tasa de ocupación
        </h3>
        <p className="text-xs text-slate-400">Porcentaje promedio mensual</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={MOCK_SPA_ACTIVITY} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: textColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: textColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
        <Tooltip
            contentStyle={{
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '12px',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter={(value: any) => [`${Number(value)}%`, 'Ocupación']}
        />
          <Bar
            dataKey="ocupacion"
            fill="#7c3aed"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}