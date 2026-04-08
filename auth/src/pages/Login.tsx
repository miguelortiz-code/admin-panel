import { AuthCard } from '../components/organisms/AuthCard'
import { LoginForm } from '../components/molecules/LoginForm'
import { useAuth } from '../hooks/useAuth'
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated'

export function LoginPage() {
  const { isLoading, error, signIn } = useAuth()
  const { checking } = useRedirectIfAuthenticated()

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
      </div>
    )
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