<template>
  <NuxtLink
    :to="`/jokes/${joke.id}`"
    class="group border border-border rounded-lg p-5 bg-surface shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-65 flex flex-col justify-between w-full no-underline hover:no-underline relative"
  >
    <div class="flex-grow">
      <div class="font-semibold text-lg mb-3 text-text line-clamp-3 overflow-hidden">
        {{ joke.setup }}
      </div>
      <div class="text-text-muted mt-2 italic line-clamp-3 overflow-hidden">
        {{ joke.punchline }}
      </div>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <AppChip :variant="getChipVariant(joke.type)" size="md">
        {{ joke.type }}
      </AppChip>

      <Icon
        name="octicon:chevron-right-16"
        class="h-5 w-5 text-primary-500 transition-transform group-hover:translate-x-1 duration-300"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useJokeUtils } from '~/composables/useJokeUtils';
import type { Joke } from '~/types/joke';

defineProps<{
  joke: Joke;
}>();

const { getChipVariant } = useJokeUtils();
</script>
