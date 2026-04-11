export interface Tenant {
  id: number
  state_id: number
  name: string
  nit: string
  email: string
  phone: string | null
  city: string | null
  address: string | null
  logo_url: string | null
  website: string | null
  owner_name: string | null
  owner_email: string | null
  schema_name: string
  created_at: string
  updated_at: string
  state?: {
    id: number
    name: string
  }
}

export interface TenantInsert {
  state_id: number
  name: string
  nit: string
  email: string
  phone?: string
  city?: string
  address?: string
  logo_url?: string
  website?: string
  owner_name?: string
  owner_email?: string
  schema_name: string
}

export interface TenantUpdate extends Partial<TenantInsert> {
  id: number
}

export interface TenantFilters {
  search: string
  state_id: number | null
}

export interface Subscription {
  id: number
  start_date: string | null
  end_date: string | null
  plan: {
    id: number
    name: string
    price: number
    currency: string
  } | null
  state: {
    id: number
    name: string
  } | null
}

export interface TenantDetail extends Tenant {
  subscriptions: Subscription[]
}