import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface UseRedirectIfAuthenticatedReturn {
  checking: boolean
}

export function useRedirectIfAuthenticated(): UseRedirectIfAuthenticatedReturn {
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        window.location.href = import.meta.env.VITE_DASHBOARD_URL
        return
      }

      setChecking(false)
    }

    checkSession()
  }, [])

  return { checking }
}