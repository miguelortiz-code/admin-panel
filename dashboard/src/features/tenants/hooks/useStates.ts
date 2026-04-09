import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../../lib/supabase'

export function useStates() {
  return useQuery({
    queryKey: ['states'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('states')
        .select('*')
        .order('name')
      if (error) throw error
      return data
    },
    staleTime: Infinity,
  })
}