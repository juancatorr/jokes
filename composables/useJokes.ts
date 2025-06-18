import { ref, watch, type Ref } from 'vue';
import { useNuxtApp } from 'nuxt/app';
import type { Joke, JokeType } from '~/types/joke';

export function useJokes(type: Ref<JokeType | 'random'>) {
  const api = useNuxtApp().$api as import('axios').AxiosInstance;
  const jokes = ref<Joke[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchJokes = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<Joke[]>(`/jokes/${type.value}/ten`);
      jokes.value = data;
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = errorMessage || 'Error loading jokes';
    } finally {
      loading.value = false;
    }
  };

  watch(type, fetchJokes, { immediate: true });

  return { jokes, loading, error, fetchJokes };
}
