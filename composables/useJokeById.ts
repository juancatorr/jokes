import { useQuery } from '@tanstack/vue-query';
import { useNuxtApp } from 'nuxt/app';
import type { Joke } from '~/types/joke';

/**
 * Hook para obtener un chiste por ID
 * @param id ID del chiste
 */
export function useJokeById(id: number) {
  const api = useNuxtApp().$api as import('axios').AxiosInstance;

  return useQuery<Joke, Error>(
    ['joke', id],
    async () => {
      const { data } = await api.get<Joke>(`/jokes/${id}`);
      return data;
    },
    {
      enabled: !!id,
    }
  );
}
