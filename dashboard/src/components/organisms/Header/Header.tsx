import { UserMenu } from '../../molecules/UserMenu'
import { NotificationDropdown } from '../../molecules/NotificationDropdown'
import { SearchBar } from '../../molecules/SearchBar'
import { useUIStore } from '../../../store/ui.store'
import { useState } from 'react'
import { cn } from '../../../utils/cn'

export function Header() {
  const { toggleSidebar } = useUIStore()
  const [search, setSearch] = useState('')

  return (
    <header className={cn(
      'flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4',
      'dark:border-slate-700 dark:bg-slate-900'
    )}>

      {/* Izquierda — hamburguesa */}
      <button
        onClick={toggleSidebar}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Centro — buscador */}
      <div className="flex flex-1 justify-center">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Buscar spas, usuarios, reportes..."
          className="w-full max-w-md"
        />
      </div>

      {/* Derecha — notificaciones + usuario */}
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <UserMenu />
      </div>

    </header>
  )
}