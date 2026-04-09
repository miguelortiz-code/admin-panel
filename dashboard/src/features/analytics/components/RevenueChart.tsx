import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { MOCK_SPA_ACTIVITY } from '../data/dashboard.mock'
import { useUIStore } from '../../../store/ui.store'

export function RevenueChart() {
  const { isDarkMode } = useUIStore()

  const textColor = isDarkMode ? '#94a3b8' : '#64748b'
  const gridColor = isDarkMode ? '#1e293b' : '#f1f5f9'

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Ingresos estimados
        </h3>
        <p className="text-xs text-slate-400">Evolución mensual</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={MOCK_SPA_ACTIVITY} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
            tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
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
        formatter={(value: any) => [`$${Number(value).toLocaleString('es-CO')}`, 'Ingresos']}
        />
          <Area
            type="monotone"
            dataKey="ingresos"
            stroke="#7c3aed"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}