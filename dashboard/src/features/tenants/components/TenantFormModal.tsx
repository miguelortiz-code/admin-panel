import { useState, useEffect } from 'react'
import { Modal } from '../../../components/organisms/Modal'
import { FormField } from '../../../components/molecules/FormField'
import { Input } from '../../../components/atoms/Input'
import { Button } from '../../../components/atoms/Button'
import { useStates } from '../hooks/useStates'
import { useTenants } from '../hooks/useTenants'
import type { Tenant, TenantInsert } from '../types/tenant.types'

interface TenantFormModalProps {
  isOpen: boolean
  onClose: () => void
  tenant?: Tenant | null
}

const emptyForm = {
  name: '',
  nit: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  website: '',
  owner_name: '',
  owner_email: '',
  state_id: 1,
  expiration_date: '',
}

export function TenantFormModal({ isOpen, onClose, tenant }: TenantFormModalProps) {
  const [form, setForm] = useState(emptyForm)
  const { data: states = [] } = useStates()
  const { createTenant, updateTenant, isCreating, isUpdating } = useTenants()

  const isEdit = !!tenant
  const isLoading = isCreating || isUpdating
useEffect(() => {
  if (!isOpen) return

  if (tenant) {
    setForm({
      name: tenant.name,
      nit: tenant.nit,
      email: tenant.email,
      phone: tenant.phone ?? '',
      city: tenant.city ?? '',
      address: tenant.address ?? '',
      website: tenant.website ?? '',
      owner_name: tenant.owner_name ?? '',
      owner_email: tenant.owner_email ?? '',
      state_id: tenant.state_id,
      expiration_date: tenant.expiration_date
        ? tenant.expiration_date.split('T')[0]
        : '',
    })
  } else {
    setForm(emptyForm)
  }
}, [isOpen, tenant])

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    const payload: Omit<TenantInsert, 'schema_name'> = {
      name: form.name,
      nit: form.nit,
      email: form.email,
      phone: form.phone || undefined,
      city: form.city || undefined,
      address: form.address || undefined,
      website: form.website || undefined,
      owner_name: form.owner_name || undefined,
      owner_email: form.owner_email || undefined,
      state_id: Number(form.state_id),
      expiration_date: form.expiration_date || undefined,
    }

    if (isEdit && tenant) {
      updateTenant({ id: tenant.id, ...payload })
    } else {
      createTenant(payload)
    }
    onClose()
  }

  const spaStates = states.filter(s =>
    ['Activo', 'Inactivo', 'Suspendido', 'Pendiente'].includes(s.name)
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Editar tenant' : 'Nuevo tenant'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            {isEdit ? 'Guardar cambios' : 'Crear tenant'}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Información básica */}
        <div className="col-span-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            Información básica
          </p>
        </div>

        <FormField id="name" label="Nombre del spa" required>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Spa Zen Garden"
          />
        </FormField>

        <FormField id="nit" label="NIT" required>
          <Input
            id="nit"
            value={form.nit}
            onChange={(e) => handleChange('nit', e.target.value)}
            placeholder="900000000-1"
          />
        </FormField>

        <FormField id="email" label="Email" required>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="contacto@spa.com"
          />
        </FormField>

        <FormField id="phone" label="Teléfono">
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+57 300 000 0000"
          />
        </FormField>

        <FormField id="city" label="Ciudad">
          <Input
            id="city"
            value={form.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Bogotá"
          />
        </FormField>

        <FormField id="address" label="Dirección">
          <Input
            id="address"
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Calle 123 # 45-67"
          />
        </FormField>

        <FormField id="website" label="Sitio web">
          <Input
            id="website"
            value={form.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://spa.com"
          />
        </FormField>

        {/* Propietario */}
        <div className="col-span-2 mt-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            Propietario
          </p>
        </div>

        <FormField id="owner_name" label="Nombre del propietario">
          <Input
            id="owner_name"
            value={form.owner_name}
            onChange={(e) => handleChange('owner_name', e.target.value)}
            placeholder="Juan Pérez"
          />
        </FormField>

        <FormField id="owner_email" label="Email del propietario">
          <Input
            id="owner_email"
            type="email"
            value={form.owner_email}
            onChange={(e) => handleChange('owner_email', e.target.value)}
            placeholder="juan@spa.com"
          />
        </FormField>

        {/* Configuración */}
        <div className="col-span-2 mt-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            Configuración
          </p>
        </div>

        <FormField id="state_id" label="Estado" required>
          <select
            id="state_id"
            value={form.state_id}
            onChange={(e) => handleChange('state_id', Number(e.target.value))}
            className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {spaStates.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </FormField>

        <FormField id="expiration_date" label="Fecha de vencimiento">
          <Input
            id="expiration_date"
            type="date"
            value={form.expiration_date}
            onChange={(e) => handleChange('expiration_date', e.target.value)}
          />
        </FormField>

      </div>
    </Modal>
  )
}