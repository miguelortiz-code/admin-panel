import { AuthCard } from '../components/organisms/AuthCard'
import { LoginForm } from '../components/molecules/LoginForm'
import { FullscreenLoader } from '../components/templates/FullscreenLoader'
import { useAuth } from '../hooks/useAuth'
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated'

export function LoginPage() {
  const { isLoading, error, signIn } = useAuth()
  const { checking } = useRedirectIfAuthenticated()

  if (checking) {
    return <FullscreenLoader />
  }

  return (
    <AuthCard
      title="Panel Administrativo"
      subtitle="Ingresa tus credenciales para continuar"
    >
      <LoginForm
        onSubmit={signIn}
        isLoading={isLoading}
        error={error}
      />
    </AuthCard>
  )
}