import axios from 'axios';
import { defineNuxtPlugin } from 'nuxt/app';
import { useRuntimeConfig, type NuxtApp } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl as string;
  const api = axios.create({
    baseURL: apiBaseUrl,
  });

  nuxtApp.provide('api', api);
});
