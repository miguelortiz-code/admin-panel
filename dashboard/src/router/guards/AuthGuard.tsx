import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FullscreenLoader } from '../../components/templates/FullscreenLoader'

export function AuthGuard() {
  const { session, isLoading } = useAuth()

  if (isLoading) {
    return <FullscreenLoader />
  }

  if (!session) {
    window.location.href = import.meta.env.VITE_AUTH_URL
    return null
  }

  return <Outlet />
}