<template>
  <div class="border rounded p-4 w-full max-w-xl bg-white shadow hover:shadow-md transition-shadow">
    <div class="font-semibold">{{ joke.setup }}</div>
    <div class="text-gray-600 mt-2">{{ joke.punchline }}</div>
    <div class="text-sm text-gray-400 mt-2">Type: {{ joke.type }}</div>
    <div class="mt-3 flex justify-end">
      <NuxtLink
        :to="`/jokes/${joke.id}`"
        class="text-sm text-blue-500 hover:text-blue-700 transition-colors"
      >
        View details
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Joke } from '~/types/joke';

defineProps<{
  joke: Joke;
}>();
</script>
