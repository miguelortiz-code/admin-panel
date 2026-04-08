import { useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase'

interface UseAuthReturn {
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
}

const isDevelopment = import.meta.env.DEV

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
        const message = getErrorMessage(error.message)
        setError(message)
        toast.error(message)
        return
      }

      if (data.session) {
        toast.success('Bienvenido de nuevo')

        if (isDevelopment) {
          // Desarrollo: pasa tokens via URL params entre puertos distintos
          const dashboardUrl = new URL(import.meta.env.VITE_DASHBOARD_URL)
          dashboardUrl.searchParams.set('access_token', data.session.access_token)
          dashboardUrl.searchParams.set('refresh_token', data.session.refresh_token)
          setTimeout(() => {
            window.location.href = dashboardUrl.toString()
          }, 800)
        } else {
          // Producción: la cookie HttpOnly ya fue seteada por Supabase
          // El dashboard la lee automáticamente desde el dominio compartido .app.com
          setTimeout(() => {
            window.location.href = import.meta.env.VITE_DASHBOARD_URL
          }, 800)
        }
      }

    } catch {
      const message = 'Ocurrió un error inesperado. Intenta de nuevo.'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, signIn }
}

function getErrorMessage(message: string): string {
  const errors: Record<string, string> = {
    'Invalid login credentials': 'Correo o contraseña incorrectos.',
    'Email not confirmed': 'Debes confirmar tu correo antes de ingresar.',
    'Too many requests': 'Demasiados intentos. Espera unos minutos.',
  }

  return errors[message] ?? 'Ocurrió un error inesperado. Intenta de nuevo.'
}