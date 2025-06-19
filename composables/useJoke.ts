import { computed } from 'vue';
import { useApiQuery } from '~/composables/useApiQuery';
import type { Joke } from '~/types/joke';

export function useJoke(id: number) {
  const result = useApiQuery<Joke>(`/jokes/${id}`, ['joke', id], {
    enabled: !!id,
  });

  const joke = computed(() => result.data.value);
  const loading = computed(() => result.isPending.value);
  const error = computed(() => (result.error.value ? (result.error.value as Error).message : null));
  const isError = computed(() => result.isError.value);

  return { joke, loading, error, isError };
}
