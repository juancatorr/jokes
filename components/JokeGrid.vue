<template>
  <div class="w-full flex justify-end items-center mb-4 gap-4">
    <JokeTypeSelector :initial-type="type" @type-change="handleTypeChange" />
    <AppButton
      variant="primary"
      rounded="md"
      size="lg"
      class="ml-2"
      title="Refresh jokes"
      @click="fetchJokes"
    >
      <Icon name="octicon:sync-16" class="h-5 w-5" />
    </AppButton>
  </div>

  <JokeSkeletonGrid v-if="loading" />
  <div v-else-if="error" class="my-4 text-center text-danger-fg">Error: {{ error }}</div>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
    <JokeCard v-for="joke in jokes" :key="joke.id" :joke="joke" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useJokes } from '~/composables/useJokes';
import type { JokeType } from '~/types/joke';
import JokeCard from '~/components/JokeCard.vue';
import JokeTypeSelector from '~/components/JokeTypeSelector.vue';
import JokeSkeletonGrid from '~/components/JokeSkeletonGrid.vue';
import AppButton from '~/components/AppButton.vue';
import { useToast } from '~/composables/useToast';

const type = ref<JokeType>('programming');
const { jokes, loading, error, fetchJokes } = useJokes(type);
const { showToast } = useToast();

watch(
  () => error.value,
  (newError) => {
    if (newError) {
      showToast(`Error loading jokes: ${newError}`, 'error', 5000);
    }
  },
  { immediate: true }
);

function handleTypeChange(newType: JokeType) {
  type.value = newType;
}
</script>
