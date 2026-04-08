import { useState, type FormEvent } from 'react'
import { Button } from '../../../components/atoms/Button'
import { Input } from '../../../components/atoms/Input'
import { Label } from '../../../components/atoms/Label'
import { cn } from '../../../utils/cn'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  isLoading?: boolean
  error?: string | null
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" required>
          Correo electrónico
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@tuempresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          disabled={isLoading}
          required
          autoComplete="email"
          autoFocus
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" required>
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          disabled={isLoading}
          required
          autoComplete="current-password"
        />
      </div>

      {/* Error message */}
      {error && (
        <p className={cn('text-sm text-red-500')}>
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        disabled={!email || !password}
      >
        Iniciar sesión
      </Button>

    </form>
  )
}