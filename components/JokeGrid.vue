<template>
  <div>
    <JokeTypeSelector :initial-type="type" @type-change="handleTypeChange" />

    <div v-if="loading" class="my-4 text-center">Loading jokes...</div>
    <div v-else-if="error" class="my-4 text-center text-red-500">Error: {{ error }}</div>

    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <JokeCard v-for="joke in jokes" :key="joke.id" :joke="joke" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useJokesSimple } from '~/composables/useJokesSimple';
import type { JokeType } from '~/types/joke';
import JokeCard from '~/components/JokeCard.vue';
import JokeTypeSelector from '~/components/JokeTypeSelector.vue';

const type = ref<JokeType>('programming');
const { jokes, loading, error } = useJokesSimple(type);

function handleTypeChange(newType: JokeType) {
  type.value = newType;
}
</script>
