import { useRuntimeConfig } from 'nuxt/app';
import type { Joke } from '~/types/joke';

export function useServerApi() {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  return {
    async fetchJoke(id: number): Promise<Joke> {
      return await $fetch<Joke>(`${apiBaseUrl}/jokes/${id}`);
    },

    async fetchJokes(type?: string): Promise<Joke[]> {
      const url = type
        ? `${apiBaseUrl}/jokes?type=${encodeURIComponent(type)}`
        : `${apiBaseUrl}/jokes`;
      return await $fetch<Joke[]>(url);
    },
    async fetchJokeTypes(): Promise<string[]> {
      return await $fetch<string[]>(`${apiBaseUrl}/types`);
    },
  };
}
