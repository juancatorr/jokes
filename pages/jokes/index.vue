<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold text-primary mb-6">Jokes List</h1>

    <div class="mb-4">
      <label for="type" class="mr-2">Tipo:</label>
      <select id="type" v-model="type" class="border rounded px-2 py-1">
        <option value="programming">Programming</option>
        <option value="general">General</option>
        <option value="knock-knock">Knock-knock</option>
      </select>
    </div>

    <div v-if="loading">Loading jokes...</div>
    <div v-else-if="error">Error: {{ error }}</div>

    <div
      v-for="joke in jokes"
      :key="joke.id"
      class="border rounded p-4 w-full max-w-xl bg-white shadow"
    >
      <div class="font-semibold">{{ joke.setup }}</div>
      <div class="text-gray-600 mt-2">{{ joke.punchline }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useJokesSimple } from '~/composables/useJokesSimple';
import type { JokeType } from '~/types/joke';

definePageMeta({
  ssr: false,
});

const type = ref<JokeType>('programming');
const { jokes, loading, error } = useJokesSimple(type);
</script>
