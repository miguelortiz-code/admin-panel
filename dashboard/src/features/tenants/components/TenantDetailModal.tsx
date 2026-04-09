import { Modal } from '../../../components/organisms/Modal'
import { Button } from '../../../components/atoms/Button'
import { StatusBadge } from '../../../components/molecules/StatusBadge'
import { Spinner } from '../../../components/atoms/Spinner'
import { useTenantDetail } from '../hooks/useTenantDetail'
import type { Tenant, TenantDetail, Subscription } from '../types/tenant.types'
import { cn } from '../../../utils/cn'

interface TenantDetailModalProps {
  isOpen: boolean
  onClose: () => void
  tenant: Tenant | null
  onEdit: (tenant: Tenant) => void
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {value ?? '—'}
      </p>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <p className="col-span-2 mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
      {title}
    </p>
  )
}

type StateVariant = 'success' | 'danger' | 'warning' | 'default'

const stateVariantMap: Record<string, StateVariant> = {
  'Activo':     'success',
  'Suspendido': 'danger',
  'Pendiente':  'warning',
  'Inactivo':   'default',
}

export function TenantDetailModal({ isOpen, onClose, tenant, onEdit }: TenantDetailModalProps) {
  const { data, isLoading } = useTenantDetail(tenant?.id ?? null)
  const detail = data as TenantDetail | undefined

  const activeSubscription = detail?.subscriptions?.find(
    (s: Subscription) => s.state?.name === 'Al día' || s.state?.name === 'Trial'
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalle del tenant"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {tenant && (
            <Button onClick={() => { onClose(); onEdit(tenant) }}>
              Editar tenant
            </Button>
          )}
        </>
      }
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner size="lg" />
        </div>
      ) : detail ? (
        <div className="flex flex-col gap-5">

          {/* Header del tenant */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 dark:border-slate-700">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xl font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
              {detail.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {detail.name}
                </p>
                <StatusBadge status={stateVariantMap[detail.state?.name ?? ''] ?? 'default'} />
              </div>
              <p className="text-sm text-slate-500">{detail.email}</p>
              <p className="mt-0.5 font-mono text-xs text-slate-400">{detail.schema_name}</p>
            </div>
          </div>

          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <SectionTitle title="Información básica" />
            <InfoRow label="NIT" value={detail.nit} />
            <InfoRow label="Teléfono" value={detail.phone} />
            <InfoRow label="Ciudad" value={detail.city} />
            <InfoRow label="Dirección" value={detail.address} />
            <InfoRow label="Sitio web" value={detail.website} />
            <InfoRow
              label="Fecha vencimiento"
              value={detail.expiration_date
                ? new Date(detail.expiration_date).toLocaleDateString('es-CO')
                : null}
            />
          </div>

          {/* Propietario */}
          <div className="grid grid-cols-2 gap-4">
            <SectionTitle title="Propietario" />
            <InfoRow label="Nombre" value={detail.owner_name} />
            <InfoRow label="Email" value={detail.owner_email} />
          </div>

          {/* Suscripción activa */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Suscripción activa
            </p>
            {activeSubscription ? (
              <div className={cn(
                'grid grid-cols-2 gap-4 rounded-xl border border-slate-100 p-4',
                'dark:border-slate-700'
              )}>
                <InfoRow label="Plan" value={activeSubscription.plan?.name} />
                <InfoRow
                  label="Precio"
                  value={activeSubscription.plan?.price
                    ? `$ ${Number(activeSubscription.plan.price).toLocaleString('es-CO')}`
                    : null}
                />
                <InfoRow
                  label="Inicio"
                  value={activeSubscription.start_date
                    ? new Date(activeSubscription.start_date).toLocaleDateString('es-CO')
                    : null}
                />
                <InfoRow
                  label="Vencimiento"
                  value={activeSubscription.end_date
                    ? new Date(activeSubscription.end_date).toLocaleDateString('es-CO')
                    : null}
                />
              </div>
            ) : (
              <div className="rounded-xl border border-slate-100 p-4 text-center dark:border-slate-700">
                <p className="text-sm text-slate-400">Sin suscripción activa</p>
              </div>
            )}
          </div>

          {/* Historial de suscripciones */}
          {detail.subscriptions?.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                Historial de suscripciones
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-700">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Plan</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Estado</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Inicio</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-400">Fin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {detail.subscriptions.map((sub: Subscription) => (
                      <tr key={sub.id}>
                        <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                          {sub.plan?.name ?? '—'}
                        </td>
                        <td className="px-4 py-2">
                          <span className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-medium',
                            sub.state?.name === 'Al día'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                              : sub.state?.name === 'Vencida'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                          )}>
                            {sub.state?.name ?? '—'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-slate-500 dark:text-slate-400">
                          {sub.start_date
                            ? new Date(sub.start_date).toLocaleDateString('es-CO')
                            : '—'}
                        </td>
                        <td className="px-4 py-2 text-slate-500 dark:text-slate-400">
                          {sub.end_date
                            ? new Date(sub.end_date).toLocaleDateString('es-CO')
                            : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      ) : null}
    </Modal>
  )
}