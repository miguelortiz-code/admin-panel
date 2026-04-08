import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../organisms/Sidebar'
import { useAuthStore } from '../../../store/auth.store'

export function DashboardLayout() {
  const { user } = useAuthStore()

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Sidebar fijo a la izquierda */}
      <Sidebar
        userName={user?.full_name ?? 'Administrador'}
        userEmail={user?.email ?? ''}
      />

      {/* Contenido principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

    </div>
  )
}