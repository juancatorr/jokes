<template>
  <div class="mb-4 flex justify-center">
    <label for="type" class="mr-2">Type:</label>
    <select
      id="type"
      v-model="selectedType"
      class="border rounded px-2 py-1"
      @change="emitTypeChange"
    >
      <option value="programming">Programming</option>
      <option value="general">General</option>
      <option value="knock-knock">Knock-knock</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { JokeType } from '~/types/joke';

const props = defineProps<{
  initialType?: JokeType;
}>();

const emit = defineEmits<{
  (e: 'typeChange', type: JokeType): void;
}>();

const selectedType = ref<JokeType>(props.initialType || 'programming');

function emitTypeChange() {
  emit('typeChange', selectedType.value);
}

// Emit initial value on mount
watch(
  () => selectedType.value,
  (newType) => {
    emit('typeChange', newType);
  },
  { immediate: true }
);
</script>
