import { useInfiniteQuery } from '@tanstack/vue-query';
import { computed, ref, type Ref } from 'vue';
import { useNuxtApp } from 'nuxt/app';
import { useApiQuery } from '~/composables/useApiQuery';
import type { Joke, JokeType } from '~/types/joke';

export type SortOption = 'id' | 'setup' | 'type' | 'none';
export type SortDirection = 'asc' | 'desc';

export function useJokes(type: Ref<JokeType | 'random'>) {
  const result = useApiQuery<Joke[]>(`/jokes/${type.value}/ten`, ['jokes', type], {
    enabled: !!type.value,
  });

  const jokes = computed(() => result.data.value || []);
  const loading = computed(() => result.isPending.value);
  const error = computed(() => (result.error.value ? (result.error.value as Error).message : null));

  const fetchJokes = () => result.refetch();

  return { jokes, loading, error, fetchJokes };
}

export function useRandomJokes(initialLimit: number = 10) {
  const api = useNuxtApp().$api as import('axios').AxiosInstance;
  const sortOption = ref<SortOption>('none');
  const sortDirection = ref<SortDirection>('asc');

  const result = useInfiniteQuery({
    queryKey: ['random-jokes'],
    queryFn: async () => {
      const { data } = await api.get<Joke[]>(`/jokes/random/${initialLimit}`);
      return data;
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const allJokes = computed(() => {
    if (!result.data.value) return [];
    return result.data.value.pages.flat();
  });

  const sortedJokes = computed(() => {
    if (sortOption.value === 'none') return allJokes.value;

    return [...allJokes.value].sort((a, b) => {
      let comparison = 0;

      if (sortOption.value === 'id') {
        comparison = a.id > b.id ? 1 : -1;
      } else if (sortOption.value === 'setup') {
        comparison = a.setup.localeCompare(b.setup);
      } else if (sortOption.value === 'type') {
        comparison = a.type.localeCompare(b.type);
      }

      return sortDirection.value === 'asc' ? comparison : -comparison;
    });
  });

  const jokes = sortedJokes;
  const loading = computed(() => result.isPending.value);
  const error = computed(() => (result.error.value ? (result.error.value as Error).message : null));
  const isFetchingNextPage = computed(() => result.isFetchingNextPage.value);
  const hasNextPage = computed(() => result.hasNextPage.value);

  const fetchNextPage = async () => {
    if (hasNextPage.value && !isFetchingNextPage.value) {
      await result.fetchNextPage();
      return true;
    }
    return false;
  };

  const setSorting = (option: SortOption, direction: SortDirection = 'asc') => {
    sortOption.value = option;
    sortDirection.value = direction;
  };

  const toggleSortDirection = () => {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  };

  return {
    jokes,
    loading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    sortOption,
    sortDirection,
    setSorting,
    toggleSortDirection,
  };
}
