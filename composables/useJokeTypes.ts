import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useNuxtApp } from 'nuxt/app';

export function useJokeTypes() {
  const api = useNuxtApp().$api as import('axios').AxiosInstance;

  const result = useQuery({
    queryKey: ['joke-types'],
    queryFn: async () => {
      const { data } = await api.get<string[]>('/types');
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });

  const jokeTypes = computed(() => result.data.value || []);
  const loading = computed(() => result.isPending.value);
  const error = computed(() => (result.error.value ? (result.error.value as Error).message : null));

  return {
    jokeTypes,
    loading,
    error,
  };
}
