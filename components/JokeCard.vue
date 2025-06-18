<template>
  <NuxtLink
    :to="`/jokes/${joke.id}`"
    class="group border border-border rounded-lg p-5 bg-surface shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between w-full no-underline hover:no-underline relative"
  >
    <div class="flex-grow">
      <div class="font-semibold text-lg mb-3 text-text">{{ joke.setup }}</div>
      <div class="text-text-muted mt-2 italic">{{ joke.punchline }}</div>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-text-subtle px-2 py-1 bg-secondary-50 rounded-full">
        {{ joke.type }}
      </div>

      <Icon
        name="octicon:chevron-right-16"
        class="h-5 w-5 text-primary-500 transition-transform group-hover:translate-x-1 duration-300"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Joke } from '~/types/joke';

defineProps<{
  joke: Joke;
}>();
</script>
