<template>
  <div class="mb-4 flex justify-center items-center">
    <label for="type" class="mr-2 text-text font-medium">Type:</label>
    <div v-if="loading" class="flex items-center">
      <div class="w-[148px] h-[36px] bg-gray-200 rounded-lg animate-pulse"/>
    </div>
    <select
      v-else
      id="type"
      v-model="selectedType"
      class="border border-border rounded-lg px-3 py-1.5 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors duration-normal"
      @change="emitTypeChange"
    >
      <option v-for="type in availableTypes" :key="type" :value="type">
        {{ formatType(type) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { JokeType } from '~/types/joke';
import { useJokeTypes } from '~/composables/useJokeTypes';
import { useToast } from '~/composables/useToast';

const props = defineProps<{
  initialType?: JokeType;
}>();

const emit = defineEmits<{
  (e: 'typeChange', type: JokeType): void;
}>();

const { data, loading, error } = useJokeTypes();
const { showToast } = useToast();

const fallbackTypes: JokeType[] = ['programming', 'general', 'knock-knock'];

const availableTypes = computed<JokeType[]>(() => {
  return data.value && data.value.length > 0 ? data.value : fallbackTypes;
});

watch(
  () => error.value,
  (newError) => {
    if (newError) {
      showToast('Error loading joke types. Using default types.', 'error', 5000);
    }
  },
  { immediate: true }
);

const selectedType = ref<JokeType>(props.initialType || 'programming');

function emitTypeChange() {
  emit('typeChange', selectedType.value);
}

function formatType(type: string): string {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

watch(
  () => selectedType.value,
  (newType) => {
    emit('typeChange', newType);
  },
  { immediate: true }
);
</script>
