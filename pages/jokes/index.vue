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

    <div class="w-full max-w-xl space-y-4">
      <JokeCard v-for="joke in jokes" :key="joke.id" :joke="joke" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useJokesSimple } from '~/composables/useJokesSimple';
import type { JokeType } from '~/types/joke';
import JokeCard from '~/components/JokeCard.vue';

definePageMeta({
  ssr: false,
});

const type = ref<JokeType>('programming');
const { jokes, loading, error } = useJokesSimple(type);
</script>
