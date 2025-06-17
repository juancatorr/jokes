<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold text-secondary mb-2">Joke Detail</h1>
    <p class="text-lg text-gray-700">ID: {{ id }}</p>

    <div v-if="isLoading" class="w-full max-w-xl text-center py-8">Loading joke...</div>
    <div v-else-if="isError" class="w-full max-w-xl text-center py-8 text-red-500">
      Error: {{ errorMessage }}
    </div>
    <div
      v-else-if="joke"
      class="border border-gray-200 rounded-lg p-6 w-full max-w-2xl bg-white shadow-md"
    >
      <div class="font-semibold text-xl mb-4">{{ joke.setup }}</div>
      <div class="text-gray-600 mt-3 text-lg italic">{{ joke.punchline }}</div>
      <div class="text-sm text-gray-400 mt-4 inline-block px-3 py-1 bg-gray-100 rounded-full">
        Type: {{ joke.type }}
      </div>
      <div class="mt-8 flex justify-end">
        <NuxtLink
          to="/jokes"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Jokes List</span>
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

definePageMeta({
  keepalive: false,
});

const route = useRoute();
const id = Number(route.params.id);
const { data, isPending: isLoading, isError, error } = useJokeById(id);

const joke = computed(() => data.value as Joke | undefined);
const errorMessage = computed(() => {
  if (error.value) {
    return error.value.message || 'Unknown error';
  }
  return 'Unknown error';
});
</script>
