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
  const [showPassword, setShowPassword] = useState(false)

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
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          disabled={isLoading}
          required
          autoComplete="current-password"
        />

        {/* Toggle switch */}
        <label className="flex cursor-pointer items-center gap-2 self-start">
          <div
            onClick={() => setShowPassword(!showPassword)}
            className={cn(
              'relative h-5 mt-2 w-9 rounded-full transition-colors duration-200',
              showPassword ? 'bg-violet-600' : 'bg-slate-200'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
                showPassword ? 'translate-x-4' : 'translate-x-0.5'
              )}
            />
          </div>
          <span className="text-xs text-slate-500 select-none">
            Mostrar contraseña
          </span>
        </label>
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