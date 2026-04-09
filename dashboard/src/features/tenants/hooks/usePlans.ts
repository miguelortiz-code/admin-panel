import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../../lib/supabase'

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price')
      if (error) throw error
      return data
    },
    staleTime: Infinity,
  })
}