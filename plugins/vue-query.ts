import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import { defineNuxtPlugin, type NuxtApp } from '#app';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const queryClient = new QueryClient();
  const vueQueryOptions: VueQueryPluginOptions = {
    queryClient,
  };
  nuxtApp.vueApp.use(VueQueryPlugin, vueQueryOptions);
});
