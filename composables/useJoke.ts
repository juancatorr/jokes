import { computed } from 'vue';
import { useApiQuery } from '~/composables/useApiQuery';
import type { Joke } from '~/types/joke';

interface UseJokeOptions {
  initialData?: Joke;
  refetchInterval?: number;
}
export function useJoke(id: number, options: UseJokeOptions = {}) {
  const result = useApiQuery<Joke>(`/jokes/${id}`, ['joke', id], {
    enabled: !!id,
    initialData: options.initialData,
    refetchInterval: options.refetchInterval || 1000 * 60 * 10, // 10 minutos por defecto
  });

  const joke = computed(() => result.data.value);
  const loading = computed(() => result.isPending.value);
  const error = computed(() => (result.error.value ? (result.error.value as Error).message : null));
  const isError = computed(() => result.isError.value);

  return { joke, loading, error, isError };
}
