import { useState } from 'react'
import type { Tenant } from '../types/tenant.types'

type ModalMode = 'create' | 'edit' | 'detail' | null

export function useTenantModal() {
  const [mode, setMode] = useState<ModalMode>(null)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)

  const openCreate = () => {
    setSelectedTenant(null)
    setMode('create')
  }

  const openEdit = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setMode('edit')
  }

  const openDetail = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setMode('detail')
  }

  const close = () => {
    setMode(null)
    setSelectedTenant(null)
  }

  return {
    mode,
    selectedTenant,
    openCreate,
    openEdit,
    openDetail,
    close,
    isCreateOpen: mode === 'create',
    isEditOpen: mode === 'edit',
    isDetailOpen: mode === 'detail',
  }
}