import { useState, useEffect, useRef } from 'react'
import { Modal } from '../../../components/organisms/Modal'
import { FormField } from '../../../components/molecules/FormField'
import { Input } from '../../../components/atoms/Input'
import { Button } from '../../../components/atoms/Button'
import { Spinner } from '../../../components/atoms/Spinner'
import { useStates } from '../hooks/useStates'
import { useTenants } from '../hooks/useTenants'
import { supabase } from '../../../lib/supabase'
import { cn } from '../../../utils/cn'
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
  logo_url: '',
}

export function TenantFormModal({ isOpen, onClose, tenant }: TenantFormModalProps) {
  const [form, setForm] = useState(emptyForm)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data: states = [] } = useStates()
  const { createTenant, updateTenant, isCreating, isUpdating } = useTenants()

  const isEdit = !!tenant
  const isLoading = isCreating || isUpdating || isUploadingLogo

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
        logo_url: tenant.logo_url ?? '',
      })
      setLogoPreview(tenant.logo_url ?? null)
    } else {
      setForm(emptyForm)
      setLogoPreview(null)
      setLogoFile(null)
    }
  }, [isOpen, tenant])

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return form.logo_url || null
    setIsUploadingLogo(true)
    try {
      const ext = logoFile.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const { error } = await supabase.storage
        .from('tenants-logos')
        .upload(fileName, logoFile, { upsert: true })
      if (error) throw error
      const { data } = supabase.storage
        .from('tenants-logos')
        .getPublicUrl(fileName)
      return data.publicUrl
    } finally {
      setIsUploadingLogo(false)
    }
  }

  const handleSubmit = async () => {
    const logo_url = await uploadLogo()
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
      logo_url: logo_url || undefined,
    }

    if (isEdit && tenant) {
      updateTenant({ id: tenant.id, ...payload })
    } else {
      createTenant(payload)
    }
    onClose()
  }

  const spaStates = states.filter((s) =>
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

        {/* Logo */}
        <div className="col-span-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            Logo
          </p>
          <div className="flex items-center gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-colors',
                'border-slate-200 hover:border-violet-400 dark:border-slate-700 dark:hover:border-violet-500',
                logoPreview && 'border-solid border-violet-400 dark:border-violet-500'
              )}
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : isUploadingLogo ? (
                <Spinner size="sm" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-slate-600">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingLogo}
              >
                {logoPreview ? 'Cambiar logo' : 'Subir logo'}
              </Button>
              {logoPreview && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLogoPreview(null)
                    setLogoFile(null)
                    handleChange('logo_url', '')
                  }}
                >
                  Eliminar
                </Button>
              )}
              <p className="text-xs text-slate-400">PNG, JPG. Máx 2MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleLogoChange}
            />
          </div>
        </div>

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

        <FormField id="website" label="Sitio web" className="col-span-2">
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
            className="flex h-9 w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {spaStates.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </FormField>

      </div>
    </Modal>
  )
}