<template>
  <div class="flex items-center" :class="containerClass">
    <label v-if="label" :for="id" class="mr-2 text-text font-medium">{{ label }}:</label>
    <div v-if="loading" class="flex items-center">
      <div class="w-[148px] h-[36px] bg-gray-200 rounded-lg animate-pulse" />
    </div>
    <select
      v-else
      :id="id"
      v-model="selectedValue"
      class="border border-border rounded-lg px-3 py-1.5 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors duration-normal"
      @change="emitChange"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <slot name="append"/>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

export interface SelectOption {
  value: string;
  label: string;
}

const props = defineProps<{
  id: string;
  label?: string;
  options: SelectOption[];
  initialValue?: string;
  loading?: boolean;
  containerClass?: string;
}>();

const emit = defineEmits<{
  (e: 'change', value: string): void;
}>();

const selectedValue = ref<string>(props.initialValue || '');

watch(
  () => props.initialValue,
  (newValue) => {
    if (newValue !== undefined && newValue !== selectedValue.value) {
      selectedValue.value = newValue;
    }
  }
);

function emitChange() {
  emit('change', selectedValue.value);
}
</script>
