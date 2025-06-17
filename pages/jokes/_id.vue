<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold text-secondary mb-2">Joke Detail</h1>
    <p class="text-lg text-gray-700">ID: {{ id }}</p>

    <div v-if="isLoading">Loading joke...</div>
    <div v-else-if="isError">Error: {{ errorMessage }}</div>
    <div v-else-if="joke" class="border rounded p-4 w-full max-w-xl bg-white shadow">
      <div class="font-semibold">{{ joke.setup }}</div>
      <div class="text-gray-600 mt-2">{{ joke.punchline }}</div>
      <div class="text-sm text-gray-400 mt-2">Tipo: {{ joke.type }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useJokeById } from '~/composables/useJokeById';
import type { Joke } from '~/types/joke';
const route = useRoute();
const id = Number(route.params.id);
const { data, isLoading, isError, error } = useJokeById(id);

const joke = computed(() => data.value as Joke | undefined);
const errorMessage = computed(() => error.value?.message || 'Error desconocido');
</script>
