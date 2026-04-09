import { useQuery } from '@tanstack/react-query'
import { tenantsService } from '../services/tenants.service'

export function useTenantDetail(id: number | null) {
  return useQuery({
    queryKey: ['tenant', id],
    queryFn: () => tenantsService.getById(id!),
    enabled: !!id,
  })
}