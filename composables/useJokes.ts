import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';
import { useNuxtApp } from 'nuxt/app';
import type { Joke, JokeType } from '~/types/joke';

export function useJokes(type: Ref<JokeType | 'random'>) {
  const api = useNuxtApp().$api as import('axios').AxiosInstance;

  const result = useQuery({
    queryKey: ['jokes', type],
    queryFn: async () => {
      const { data } = await api.get<Joke[]>(`/jokes/${type.value}/ten`);
      return data;
    },
    enabled: !!type.value,
    refetchOnWindowFocus: false,
  });

  const jokes = computed(() => result.data.value || []);
  const loading = computed(() => result.isPending.value);
  const error = computed(() => (result.error.value ? (result.error.value as Error).message : null));

  return { jokes, loading, error };
}
