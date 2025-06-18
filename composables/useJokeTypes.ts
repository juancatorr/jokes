import { useQuery } from '@tanstack/vue-query';
import type { JokeType } from '~/types/joke';

export function useJokeTypes() {
  const fetchJokeTypes = async (): Promise<JokeType[]> => {
    const { data } = await useNuxtApp().$axios.get('/types');
    return data;
  };

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['joke-types'],
    queryFn: fetchJokeTypes,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    data,
    loading,
    error,
  };
}
