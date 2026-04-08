import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../organisms/Sidebar'
import { Header } from '../../organisms/Header'
import { useUIStore } from '../../../store/ui.store'
import { cn } from '../../../utils/cn'

export function DashboardLayout() {
  const { isSidebarOpen } = useUIStore()

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">

      {/* Sidebar — empuja el contenido, no se superpone */}
      <Sidebar />

      {/* Contenido derecho */}
      <div className={cn(
        'flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'ml-0' : 'ml-0'
      )}>
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

    </div>
  )
}