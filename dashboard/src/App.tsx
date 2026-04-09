import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from './providers/AuthProvider'
import { AppRouter } from './router'
import { useUIStore } from './store/ui.store'

function ThemeInitializer() {
  const { isDarkMode } = useUIStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return null
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeInitializer />
      <Toaster position="top-right" richColors closeButton />
      <AppRouter />
    </AuthProvider>
  )
}