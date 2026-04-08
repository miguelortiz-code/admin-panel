import { Badge } from '../../atoms/Badge'

type Status = 'active' | 'inactive' | 'pending' | 'suspended'

interface StatusBadgeProps {
  status: Status
}

const statusConfig: Record<Status, { label: string; variant: 'success' | 'danger' | 'warning' | 'default' }> = {
  active:    { label: 'Activo',     variant: 'success' },
  inactive:  { label: 'Inactivo',   variant: 'default' },
  pending:   { label: 'Pendiente',  variant: 'warning' },
  suspended: { label: 'Suspendido', variant: 'danger'  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return <Badge label={config.label} variant={config.variant} />
}