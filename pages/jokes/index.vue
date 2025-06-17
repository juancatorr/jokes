<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col items-center mb-6">
      <h1 class="text-3xl font-bold text-primary mb-6">Jokes List</h1>
    </div>
    <JokeGrid />
  </div>
</template>

<script setup lang="ts">
import JokeGrid from '~/components/JokeGrid.vue';

definePageMeta({
  ssr: false,
});
</script>
