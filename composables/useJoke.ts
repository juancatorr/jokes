import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useNuxtApp } from 'nuxt/app';
import type { Joke } from '~/types/joke';

export function useJoke(id: number) {
  const api = useNuxtApp().$api as import('axios').AxiosInstance;

  const result = useQuery({
    queryKey: ['joke', id],
    queryFn: async () => {
      const { data } = await api.get<Joke>(`/jokes/${id}`);
      return data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const joke = computed(() => result.data.value);
  const loading = computed(() => result.isPending.value);
  const error = computed(() => (result.error.value ? (result.error.value as Error).message : null));
  const isError = computed(() => result.isError.value);

  return { joke, loading, error, isError };
}
