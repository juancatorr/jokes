<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col items-center mb-6">
      <h1 class="text-3xl font-bold text-primary mb-6">Jokes List</h1>
    </div>

    <InfiniteJokeGrid :initial-limit="JOKES_PER_PAGE" />
  </div>
</template>

<script setup lang="ts">
import InfiniteJokeGrid from '~/components/InfiniteJokeGrid.vue';

definePageMeta({
  ssr: false,
});

const JOKES_PER_PAGE = 10;
</script>
