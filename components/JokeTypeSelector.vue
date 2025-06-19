<template>
  <AppSelector
    id="type"
    label="Type"
    :options="formattedOptions"
    :initial-value="selectedType"
    :loading="loading"
    class="flex justify-center"
    @change="handleTypeChange"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { JokeType } from '~/types/joke';
import { useJokeTypes } from '~/composables/useJokeTypes';
import { useToast } from '~/composables/useToast';
import AppSelector from '~/components/AppSelector.vue';
import type { SelectOption } from '~/components/AppSelector.vue';

const props = defineProps<{
  initialType?: JokeType;
}>();

const emit = defineEmits<{
  (e: 'typeChange', type: JokeType): void;
}>();

const { jokeTypes, loading, error } = useJokeTypes();
const { showToast } = useToast();

const fallbackTypes: JokeType[] = ['programming', 'general', 'knock-knock'];

const availableTypes = computed(() => {
  return jokeTypes.value.length > 0 ? jokeTypes.value : fallbackTypes;
});

const formattedOptions = computed<SelectOption[]>(() => {
  return availableTypes.value.map((type) => ({
    value: type,
    label: formatType(type),
  }));
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

function handleTypeChange(value: string) {
  selectedType.value = value as JokeType;
  emit('typeChange', selectedType.value);
}

function formatType(type: string): string {
  return type
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
</script>
