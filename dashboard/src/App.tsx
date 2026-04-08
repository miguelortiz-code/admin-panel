import { Toaster } from 'sonner'
import { AuthProvider } from './providers/AuthProvider'
import { AppRouter } from './router'

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors closeButton />
      <AppRouter />
    </AuthProvider>
  )
}