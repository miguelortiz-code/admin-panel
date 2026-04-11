import { type ChangeEvent } from 'react'
import { cn } from '../../../utils/cn'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ value, onChange, placeholder = 'Buscar...', className }: SearchBarProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>
      <input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'flex h-9 w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition-colors',
          'bg-white text-slate-900 placeholder:text-slate-400',
          'dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
          'border-slate-200 hover:border-slate-300 focus:ring-2 focus:ring-violet-500 focus:outline-none',
          'dark:border-slate-700 dark:hover:border-slate-600',
        )}
      />
    </div>
  )
}