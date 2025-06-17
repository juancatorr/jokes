<template>
  <NuxtLink
    :to="`/jokes/${joke.id}`"
    class="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between max-w-sm w-full no-underline hover:no-underline relative"
  >
    <div class="flex-grow">
      <div class="font-semibold text-lg mb-3 text-gray-800">{{ joke.setup }}</div>
      <div class="text-gray-600 mt-2 italic">{{ joke.punchline }}</div>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-400 px-2 py-1 bg-gray-100 rounded-full">
        {{ joke.type }}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Joke } from '~/types/joke';

defineProps<{
  joke: Joke;
}>();
</script>
