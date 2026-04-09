export interface KpiData {
  id: string
  title: string
  value: string | number
  delta: number
  icon: string
}

export interface SpaActivityData {
  month: string
  spas: number
  ingresos: number
  ocupacion: number
}

export interface AlertData {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  createdAt: Date
}