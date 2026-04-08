
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/auth.store'
import type { Session } from '@supabase/supabase-js'

interface AuthContextValue {
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { setUser } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          full_name: session.user.user_metadata?.full_name ?? '',
        })
      }
      setIsLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          full_name: session.user.user_metadata?.full_name ?? '',
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    // Escucha logout desde otras pestañas
    const channel = new BroadcastChannel('auth')
    channel.onmessage = (event) => {
      if (event.data === 'signout') {
        setSession(null)
        setUser(null)
        window.location.href = import.meta.env.VITE_AUTH_URL
      }
    }

    return () => {
      subscription.unsubscribe()
      channel.close()
    }
  }, [setUser])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    new BroadcastChannel('auth').postMessage('signout')
    window.location.href = import.meta.env.VITE_AUTH_URL
  }

  return (
    <AuthContext.Provider value={{ session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}