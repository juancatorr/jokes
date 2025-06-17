<template>
  <NuxtLink
    :to="`/jokes/${joke.id}`"
    class="border border-gray-100 rounded-lg p-5 bg-[rgb(237, 240, 244)] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between max-w-sm w-full no-underline hover:no-underline relative"
  >
    <div class="flex-grow">
      <div class="font-semibold text-lg mb-3 text-[#1e293b]">{{ joke.setup }}</div>
      <div class="text-[#94a3b8] mt-2 italic">{{ joke.punchline }}</div>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-[#94a3b8] px-2 py-1 bg-[#f3f4f6] rounded-full">
        {{ joke.type }}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-[#2563eb]"
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
