<template>
  <div class="mb-4 flex justify-center">
    <label for="type" class="mr-2 text-[#1e293b] font-medium">Type:</label>
    <select
      id="type"
      v-model="selectedType"
      class="border border-[#e5e7eb] rounded-md px-3 py-1.5 bg-[rgb(237, 240, 244)] text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-colors"
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
