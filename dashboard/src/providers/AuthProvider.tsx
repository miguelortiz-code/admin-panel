import { useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/auth.store'
import { AuthContext } from '../context/AuthContext'

const isDevelopment = import.meta.env.DEV

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { setUser } = useAuthStore()

  useEffect(() => {
    const initSession = async () => {
      if (isDevelopment) {
        const params = new URLSearchParams(window.location.search)
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (!error && data.session) {
            setSession(data.session)
            setUser({
              id: data.session.user.id,
              email: data.session.user.email ?? '',
              full_name: data.session.user.user_metadata?.full_name ?? '',
            })
          }

          window.history.replaceState({}, '', window.location.pathname)
          setIsLoading(false)
          return
        }
      }

      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          full_name: session.user.user_metadata?.full_name ?? '',
        })
      }
      setIsLoading(false)
    }

    initSession()

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
    })

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