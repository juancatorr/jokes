<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] bg-danger/10 text-danger rounded-lg p-8">
    <h1 class="text-2xl font-bold mb-4">{{ error.statusCode === 404 ? 'Página no encontrada' : 'Ocurrió un error' }}</h1>
    <p class="mb-6">{{ error.message }}</p>
    <NuxtLink to="/" class="text-primary underline font-semibold hover:text-primary/80 transition">Volver al inicio</NuxtLink>
  </div>
</template>

<script setup lang="ts">
type NuxtError = {
  statusCode:
    | 404
    | 500
    | 400
    | 401
    | 403
    | 502
    | 503
    | number;
  message: string;
};

defineProps<{
  error: NuxtError;
}>();
</script>


