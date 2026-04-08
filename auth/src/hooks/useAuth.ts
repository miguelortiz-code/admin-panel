import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface UseAuthReturn {
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(getErrorMessage(error.message))
        return
      }

      if (data.session) {
        // Redirige al dashboard después del login exitoso
        window.location.href = import.meta.env.VITE_DASHBOARD_URL
      }

    } catch {
      setError('Ocurrió un error inesperado. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, signIn }
}

// Traduce los errores de Supabase a mensajes amigables
function getErrorMessage(message: string): string {
  const errors: Record<string, string> = {
    'Invalid login credentials': 'Correo o contraseña incorrectos.',
    'Email not confirmed': 'Debes confirmar tu correo antes de ingresar.',
    'Too many requests': 'Demasiados intentos. Espera unos minutos.',
  }

  return errors[message] ?? 'Ocurrió un error inesperado. Intenta de nuevo.'
}