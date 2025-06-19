import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { useNuxtApp } from 'nuxt/app';
import type { AxiosInstance } from 'axios';

const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 5, // 5 minutes
  retry: 1,
};

export function useApiQuery<TData = unknown, TError = Error>(
  endpoint: string | (() => string),
  queryKey: unknown[] | (() => unknown[]),
  options?: Partial<UseQueryOptions<TData, TError>>
) {
  const api = useNuxtApp().$api as AxiosInstance;

  return useQuery<TData, TError>({
    queryKey: typeof queryKey === 'function' ? queryKey() : queryKey,
    queryFn: async () => {
      const endpointValue = typeof endpoint === 'function' ? endpoint() : endpoint;
      const { data } = await api.get<TData>(endpointValue);
      return data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}
