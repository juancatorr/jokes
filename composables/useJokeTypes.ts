import { computed } from 'vue';
import { useApiQuery } from '~/composables/useApiQuery';

export function useJokeTypes() {
  const result = useApiQuery<string[]>('/types', ['joke-types'], {
    staleTime: 1000 * 60 * 60, // 1 hour
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
