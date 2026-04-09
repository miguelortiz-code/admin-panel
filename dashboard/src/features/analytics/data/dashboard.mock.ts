import type { KpiData, SpaActivityData, AlertData } from '../../../types/dashboard.types'

export const MOCK_KPIS: KpiData[] = [
  {
    id: 'active-spas',
    title: 'Spas activos',
    value: 24,
    delta: 12,
    icon: 'spa',
  },
  {
    id: 'estimated-revenue',
    title: 'Ingresos estimados',
    value: '$ 4.250.000',
    delta: 8.5,
    icon: 'revenue',
  },
  {
    id: 'occupancy-rate',
    title: 'Tasa de ocupación',
    value: '73%',
    delta: -2.3,
    icon: 'occupancy',
  },
  {
    id: 'pending-alerts',
    title: 'Alertas pendientes',
    value: 5,
    delta: -1,
    icon: 'alert',
  },
]

export const MOCK_SPA_ACTIVITY: SpaActivityData[] = [
  { month: 'Ene', spas: 18, ingresos: 3200000, ocupacion: 65 },
  { month: 'Feb', spas: 19, ingresos: 3500000, ocupacion: 68 },
  { month: 'Mar', spas: 20, ingresos: 3800000, ocupacion: 70 },
  { month: 'Abr', spas: 21, ingresos: 3600000, ocupacion: 67 },
  { month: 'May', spas: 22, ingresos: 4000000, ocupacion: 71 },
  { month: 'Jun', spas: 22, ingresos: 4100000, ocupacion: 72 },
  { month: 'Jul', spas: 23, ingresos: 3900000, ocupacion: 69 },
  { month: 'Ago', spas: 23, ingresos: 4050000, ocupacion: 71 },
  { month: 'Sep', spas: 24, ingresos: 4200000, ocupacion: 73 },
  { month: 'Oct', spas: 24, ingresos: 4250000, ocupacion: 73 },
]

export const MOCK_ALERTS: AlertData[] = [
  {
    id: '1',
    title: 'Spa Aqua Relax — suscripción vencida',
    severity: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '2',
    title: 'Spa Zen Garden — pago pendiente',
    severity: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: '3',
    title: 'Spa Lotus — perfil incompleto',
    severity: 'low',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
]