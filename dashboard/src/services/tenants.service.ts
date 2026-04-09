import { supabase } from '../lib/supabase'
import type { TenantInsert, TenantUpdate, TenantFilters } from '../types/tenant.types'

const generateSchemaName = (name: string): string => {
  return 'tenant_' + name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
}

export const tenantsService = {

  getAll: async (filters: TenantFilters) => {
    let query = supabase
      .from('tenants')
      .select(`
        *,
        state:states(id, name)
      `)
      .order('created_at', { ascending: false })

    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,nit.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
      )
    }

    if (filters.state_id) {
      query = query.eq('state_id', filters.state_id)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  },

  getById: async (id: number) => {
    const { data, error } = await supabase
      .from('tenants')
      .select(`
        *,
        state:states(id, name),
        subscriptions(
          *,
          plan:plans(id, name, price, currency),
          state:states(id, name)
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  create: async (tenant: Omit<TenantInsert, 'schema_name'>) => {
    const schema_name = generateSchemaName(tenant.name)

    const { data, error } = await supabase
      .from('tenants')
      .insert({ ...tenant, schema_name })
      .select()
      .single()

    if (error) throw error
    return data
  },

  update: async ({ id, ...tenant }: TenantUpdate) => {
    const { data, error } = await supabase
      .from('tenants')
      .update(tenant)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  changeState: async (id: number, state_id: number) => {
    const { data, error } = await supabase
      .from('tenants')
      .update({ state_id })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

}