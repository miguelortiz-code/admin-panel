import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useRedirectIfAuthenticated() {
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        window.location.href = import.meta.env.VITE_DASHBOARD_URL
      }
    }

    checkSession()
  }, [])
}