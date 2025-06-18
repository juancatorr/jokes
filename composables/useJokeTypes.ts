import { useQuery } from '@tanstack/vue-query';
import { useNuxtApp } from 'nuxt/app';

export function useJokeTypes() {
  const api = useNuxtApp().$api as import('axios').AxiosInstance;

  const fetchJokeTypes = async (): Promise<string[]> => {
    const { data } = await api.get<string[]>('/types');
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
