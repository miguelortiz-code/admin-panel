import { createContext } from 'react'
import type { Session } from '@supabase/supabase-js'

interface AuthContextValue {
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)