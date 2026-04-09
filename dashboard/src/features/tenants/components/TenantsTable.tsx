import { useState } from 'react'
import { DataTable, type Column } from '../../../components/organisms/DataTable'
import { SearchBar } from '../../../components/molecules/SearchBar'
import { Badge } from '../../../components/atoms/Badge'
import { Button } from '../../../components/atoms/Button'
import { useTenants } from '../hooks/useTenants'
import type { Tenant, TenantFilters } from '../types/tenant.types'
import { cn } from '../../../utils/cn'

interface TenantsTableProps {
  onEdit: (tenant: Tenant) => void
  onDetail: (tenant: Tenant) => void
}

const PAGE_SIZE = 5

export function TenantsTable({ onEdit, onDetail }: TenantsTableProps) {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<TenantFilters>({
    search: '',
    state_id: null,
  })

  const { tenants, isLoading, changeState, isChangingState } = useTenants()

  const filtered = tenants.filter((t) => {
    const matchSearch = !filters.search ||
      t.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.nit.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.email.toLowerCase().includes(filters.search.toLowerCase())
    const matchState = !filters.state_id || t.state_id === filters.state_id
    return matchSearch && matchState
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const stateVariant = (name?: string) => {
    const map: Record<string, 'success' | 'danger' | 'warning' | 'default'> = {
      'Activo':     'success',
      'Suspendido': 'danger',
      'Pendiente':  'warning',
      'Inactivo':   'default',
    }
    return map[name ?? ''] ?? 'default'
  }

  const columns: Column<Tenant>[] = [
    {
      key: 'name',
      header: 'Tenant',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-300">
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-slate-800 dark:text-slate-200">{row.name}</p>
            <p className="text-xs text-slate-400">{row.nit}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contacto',
      render: (row) => (
        <div>
          <p className="text-slate-700 dark:text-slate-300">{row.email}</p>
          <p className="text-xs text-slate-400">{row.phone ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'city',
      header: 'Ciudad',
      render: (row) => (
        <span className="text-slate-600 dark:text-slate-400">{row.city ?? '—'}</span>
      ),
    },
    {
      key: 'state',
      header: 'Estado',
      render: (row) => (
        <Badge
          label={row.state?.name ?? '—'}
          variant={stateVariant(row.state?.name)}
        />
      ),
    },
    {
      key: 'expiration_date',
      header: 'Vencimiento',
      render: (row) => (
        <span className="text-slate-600 dark:text-slate-400">
          {row.expiration_date
            ? new Date(row.expiration_date).toLocaleDateString('es-CO')
            : '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDetail(row)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
            title="Ver detalle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          <button
            onClick={() => onEdit(row)}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
            title="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            onClick={() => changeState({
              id: row.id,
              state_id: row.state?.name === 'Activo' ? 3 : 1,
            })}
            disabled={isChangingState}
            className={cn(
              'rounded-lg p-1.5 transition-colors',
              row.state?.name === 'Activo'
                ? 'text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950'
                : 'text-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950'
            )}
            title={row.state?.name === 'Activo' ? 'Suspender' : 'Activar'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {row.state?.name === 'Activo' ? (
                <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
              ) : (
                <><polygon points="5 3 19 12 5 21 5 3"/></>
              )}
            </svg>
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">

      {/* Filtros */}
      <div className="flex items-center gap-3">
        <SearchBar
          value={filters.search}
          onChange={(value) => {
            setFilters((prev) => ({ ...prev, search: value }))
            setPage(1)
          }}
          placeholder="Buscar por nombre, NIT o email..."
          className="flex-1"
        />
        <select
          value={filters.state_id ?? ''}
          onChange={(e) => {
            setFilters((prev) => ({
              ...prev,
              state_id: e.target.value ? Number(e.target.value) : null,
            }))
            setPage(1)
          }}
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        >
          <option value="">Todos los estados</option>
          <option value="1">Activo</option>
          <option value="2">Inactivo</option>
          <option value="3">Suspendido</option>
          <option value="4">Pendiente</option>
        </select>
      </div>

      {/* Tabla */}
      <DataTable
        columns={columns}
        data={paginated}
        isLoading={isLoading}
        keyExtractor={(row) => row.id.toString()}
        emptyMessage="No se encontraron tenants."
      />

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              ‹
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              ›
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}