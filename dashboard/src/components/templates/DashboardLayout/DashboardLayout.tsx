import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../organisms/Sidebar'
import { Header } from '../../organisms/Header'
import { useUIStore } from '../../../store/ui.store'
import { cn } from '../../../utils/cn'

export function DashboardLayout() {
  const { isSidebarOpen } = useUIStore()

  return (
    <div className="grid h-screen overflow-hidden bg-slate-50 dark:bg-slate-950"
      style={{
        gridTemplateColumns: isSidebarOpen ? '256px 1fr' : '0px 1fr',
        gridTemplateRows: '64px 1fr',
      }}
    >
      {/* Sidebar */}
      <aside className={cn(
        'row-span-2 overflow-hidden transition-all duration-300',
        isSidebarOpen ? 'w-64' : 'w-0'
      )}>
        <Sidebar />
      </aside>

      {/* Header */}
      <Header />

      {/* Main */}
      <main className="overflow-y-auto p-6">
        <Outlet />
      </main>

    </div>
  )
}