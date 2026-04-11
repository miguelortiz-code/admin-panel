import { Button } from '../components/atoms/Button'
import { TenantsTable } from '../features/tenants/components/TenantsTable'
import { TenantFormModal } from '../features/tenants/components/TenantFormModal'
import { TenantDetailModal } from '../features/tenants/components/TenantDetailModal'
import { useTenantModal } from '../features/tenants/hooks/useTenantModal'

export default function TenantsPage() {
  const {
    selectedTenant,
    openCreate,
    openEdit,
    openDetail,
    close,
    isCreateOpen,
    isEditOpen,
    isDetailOpen,
  } = useTenantModal()

  return (
    <div className="flex flex-col gap-6">

      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Tenants
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gestión de spas registrados en el sistema
          </p>
        </div>
        <Button onClick={openCreate}>
          + Nuevo tenant
        </Button>
      </div>

      {/* Tabla */}
      <TenantsTable
        onEdit={openEdit}
        onDetail={openDetail}
      />

      {/* Modal crear */}
      <TenantFormModal
        isOpen={isCreateOpen}
        onClose={close}
      />

      {/* Modal editar */}
      <TenantFormModal
        isOpen={isEditOpen}
        onClose={close}
        tenant={selectedTenant}
      />

      {/* Modal detalle */}
      <TenantDetailModal
        isOpen={isDetailOpen}
        onClose={close}
        tenant={selectedTenant}
        onEdit={openEdit}
      />

    </div>
  )
}