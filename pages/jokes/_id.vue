<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold text-secondary mb-2">Joke Detail</h1>
    <p class="text-lg text-gray-700">ID: {{ id }}</p>

    <div v-if="isLoading" class="w-full max-w-xl text-center py-8">Loading joke...</div>
    <div v-else-if="isError" class="w-full max-w-xl text-center py-8 text-red-500">
      Error: {{ errorMessage }}
    </div>
    <div v-else-if="joke" class="border rounded p-4 w-full max-w-xl bg-white shadow">
      <div class="font-semibold">{{ joke.setup }}</div>
      <div class="text-gray-600 mt-2">{{ joke.punchline }}</div>
      <div class="text-sm text-gray-400 mt-2">Type: {{ joke.type }}</div>
      <div class="mt-6 flex justify-end">
        <NuxtLink
          to="/jokes"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Back to Jokes List
        </NuxtLink>
      </div>
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
