import { useQuery, type UseQueryOptions } from '@tanstack/vue-query';
import { useNuxtApp } from 'nuxt/app';
import type { AxiosInstance } from 'axios';

// Configuración por defecto para todas las consultas
const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 5, // 5 minutos
  retry: 1,
};

/**
 * Hook personalizado para realizar consultas a la API con configuración predeterminada
 */
export function useApiQuery<TData = unknown, TError = Error>(
  endpoint: string,
  queryKey: unknown[],
  options?: Partial<UseQueryOptions<TData, TError>>
) {
  const api = useNuxtApp().$api as AxiosInstance;

  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get<TData>(endpoint);
      return data;
    },
    ...defaultQueryOptions,
    ...options,
  });
}
