<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] bg-danger/10 text-danger rounded-lg p-8">
    <h1 class="text-2xl font-bold mb-4">{{ error.statusCode === 404 ? 'Página no encontrada' : 'Ocurrió un error' }}</h1>
    <p class="mb-6">{{ error.message }}</p>
    <NuxtLink to="/" class="text-primary underline font-semibold hover:text-primary/80 transition">Volver al inicio</NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: #fff0f0;
  color: #c00;
}
.error-page a {
  margin-top: 2rem;
  color: #0070f3;
  text-decoration: underline;
}
</style>
