import { useUIStore } from '../../../store/ui.store'
import { cn } from '../../../utils/cn'

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useUIStore()

  return (
    <button
      onClick={toggleDarkMode}
      className="flex w-full items-center justify-between px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
      aria-label="Cambiar modo oscuro"
    >
      <div className="flex items-center gap-2">
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
        <span>{isDarkMode ? 'Modo claro' : 'Modo oscuro'}</span>
      </div>

      <div className={cn(
        'relative ml-2 h-5 w-9 shrink-0 rounded-full transition-colors duration-200 cursor-pointer',
        isDarkMode ? 'bg-violet-600' : 'bg-slate-200'
      )}>
        <span
          className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200"
          style={{ transform: isDarkMode ? 'translateX(16px)' : 'translateX(0px)' }}
        />
      </div>
    </button>
  )
}