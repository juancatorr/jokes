<template>
  <div class="w-full flex justify-end items-center mb-4 gap-4">
    <JokeTypeSelector :initial-type="type" @type-change="handleTypeChange" />
    <AppButton
      variant="primary"
      rounded="md"
      size="md"
      title="Refresh jokes"
      @click="handleRefresh"
    >
      <Icon name="octicon:sync-16" class="h-5 w-5" :class="{ 'rotate-animation': isRotating }" />
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
const isRotating = ref(false);

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

function handleRefresh() {
  isRotating.value = true;
  fetchJokes();

  setTimeout(() => {
    isRotating.value = false;
  }, 1000);
}
</script>

<style scoped>
.rotate-animation {
  animation: rotate 1s ease-in-out;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
