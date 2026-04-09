import { KpiCard } from '../components/molecules/KpiCard'
import { RevenueChart } from '../features/analytics/components/RevenueChart'
import { OccupancyChart } from '../features/analytics/components/OccupancyChart'
import { AlertsList } from '../features/analytics/components/AlertsList'
import { MOCK_KPIS } from '../features/analytics/data/dashboard.mock'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">

      {/* Encabezado */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Resumen general del sistema
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_KPIS.map((kpi) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            delta={kpi.delta}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart />
        <OccupancyChart />
      </div>

      {/* Alertas */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AlertsList />
      </div>

    </div>
  )
}