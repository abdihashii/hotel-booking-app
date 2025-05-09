import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase/supabase-client';

export function useRooms() {
  const getRooms = async () => {
    const { data, error } = await supabase.from('rooms').select('*');
    if (error) {
      console.error(error);
    }
    return data;
  };
  return useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
}
