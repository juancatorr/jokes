import { VueQueryPlugin, QueryClient, dehydrate, hydrate } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

  const vueQueryOptions: VueQueryPluginOptions = {
    queryClient,
  };

  nuxtApp.vueApp.use(VueQueryPlugin, vueQueryOptions);

  if (import.meta.client) {
    nuxtApp.hook('app:created', () => {
      const state = nuxtApp.payload.vueQueryState || null;
      if (state) {
        hydrate(queryClient, state);
      }
    });
  }

  if (import.meta.server) {
    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload.vueQueryState = dehydrate(queryClient);
    });
  }

  return {
    provide: {
      queryClient,
    },
  };
});
