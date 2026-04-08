import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../../atoms/Avatar'
import { ThemeToggle } from '../../atoms/ThemeToggle'
import { useAuth } from '../../../hooks/useAuth'
import { useAuthStore } from '../../../store/auth.store'
import { cn } from '../../../utils/cn'

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { signOut } = useAuth()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavigate = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} className="relative">

      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <Avatar name={user?.full_name ?? 'Admin'} size="sm" />
        <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">
          {user?.full_name ?? 'Administrador'}
        </span>
        {/* Arrow con animación */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'text-slate-400 transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={cn(
          'absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg',
          'dark:border-slate-700 dark:bg-slate-900'
        )}>

          {/* Info usuario */}
          <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {user?.full_name ?? 'Administrador'}
            </p>
            <p className="truncate text-xs text-slate-400">
              {user?.email ?? ''}
            </p>
          </div>

          {/* Opciones */}
          <div className="py-1">
            <button
              onClick={() => handleNavigate('/profile')}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Mi perfil
            </button>

            <button
              onClick={() => handleNavigate('/change-password')}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Cambiar contraseña
            </button>
          </div>

          {/* Dark mode toggle */}
          <div className="border-t border-slate-100 py-1 dark:border-slate-700">
            <ThemeToggle />
          </div>

          {/* Cerrar sesión */}
          <div className="border-t border-slate-100 py-1 dark:border-slate-700">
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Cerrar sesión
            </button>
          </div>

        </div>
      )}
    </div>
  )
}