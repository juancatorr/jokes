import { useQuery } from '@tanstack/vue-query';
import { useNuxtApp } from 'nuxt/app';
import type { Joke } from '~/types/joke';

/**
 * Hook to fetch a joke by ID
 * @param id Joke ID
 */
export function useJokeById(id: number) {
  const api = useNuxtApp().$api as import('axios').AxiosInstance;

  return useQuery({
    queryKey: ['joke', id],
    queryFn: async () => {
      const { data } = await api.get<Joke>(`/jokes/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
