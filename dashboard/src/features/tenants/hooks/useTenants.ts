import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { tenantsService } from '../services/tenants.service'
import type { TenantInsert, TenantUpdate, TenantFilters } from '../types/tenant.types'

const QUERY_KEY = 'tenants'

export function useTenants() {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<TenantFilters>({
    search: '',
    state_id: null,
  })

  const { data: tenants = [], isLoading } = useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => tenantsService.getAll(filters),
  })

  const createMutation = useMutation({
    mutationFn: (tenant: Omit<TenantInsert, 'schema_name'>) =>
      tenantsService.create(tenant),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
      toast.success(`Tenant "${data.name}" creado exitosamente`)
    },
    onError: () => {
      toast.error('Error al crear el tenant')
    },
  })

  const updateMutation = useMutation({
    mutationFn: (tenant: TenantUpdate) => tenantsService.update(tenant),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
      toast.success(`Tenant "${data.name}" actualizado exitosamente`)
    },
    onError: () => {
      toast.error('Error al actualizar el tenant')
    },
  })

  const changeStateMutation = useMutation({
    mutationFn: ({ id, state_id }: { id: number; state_id: number }) =>
      tenantsService.changeState(id, state_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
      toast.success('Estado actualizado exitosamente')
    },
    onError: () => {
      toast.error('Error al cambiar el estado')
    },
  })

  return {
    tenants,
    isLoading,
    filters,
    setFilters,
    createTenant: createMutation.mutate,
    updateTenant: updateMutation.mutate,
    changeState: changeStateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isChangingState: changeStateMutation.isPending,
  }
}