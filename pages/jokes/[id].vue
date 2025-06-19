<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold text-primary-600 mb-2">{{ `#${id}` }}</h1>
    <div
      v-if="isLoading"
      class="w-full text-center py-8 text-text-muted flex items-center justify-center"
    >
      <Icon name="octicon:sync-16" class="animate-spin mr-2 inline-block" />
      <p>Loading joke...</p>
    </div>
    <div v-else-if="isError" class="w-full text-center py-8 text-danger-fg">
      <Icon name="octicon:alert-16" class="mr-2 inline-block" />
      Error: {{ errorMessage }}
    </div>
    <div v-else-if="joke" class="border border-border rounded-lg p-6 w-full bg-surface shadow-md">
      <div class="font-semibold text-xl mb-4 text-text">{{ joke.setup }}</div>
      <div class="text-text-muted mt-3 text-lg italic">{{ joke.punchline }}</div>
      <div class="mt-4">
        <AppChip :variant="getChipVariant(joke.type)" size="md">
          {{ joke.type }}
        </AppChip>
      </div>
      <div class="mt-8 flex justify-end">
        <AppButton
          variant="primary"
          class="flex items-center gap-2 transform hover:scale-105"
          @click="goBack"
        >
          <Icon name="octicon:arrow-left-16" class="h-5 w-5" />
          <span>Back to Jokes List</span>
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useJokeUtils } from '~/composables/useJokeUtils';
import { useJoke } from '~/composables/useJoke';
import AppChip from '~/components/AppChip.vue';
import AppButton from '~/components/AppButton.vue';
import { useToast } from '~/composables/useToast';

definePageMeta({
  keepalive: false,
});

const { getChipVariant } = useJokeUtils();

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

function goBack() {
  router.back();
}

const { joke, loading: isLoading, isError, error } = useJoke(id);
const { showToast } = useToast();

const errorMessage = computed(() => {
  return error.value || 'Unknown error';
});

watch(
  () => isError.value,
  (hasError) => {
    if (hasError) {
      showToast(`Error loading joke #${id}: ${errorMessage.value}`, 'error', 5000);
    }
  },
  { immediate: true }
);
</script>
