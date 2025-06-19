<template>
  <div class="flex items-center gap-4">
    <div class="flex items-center">
      <label for="sort" class="mr-2 text-text font-medium">Sort by:</label>
      <select
        id="sort"
        v-model="selectedOption"
        class="border border-border rounded-lg px-3 py-1.5 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors duration-normal"
        @change="emitSortChange"
      >
        <option value="none">None</option>
        <option value="id">ID</option>
        <option value="setup">Setup</option>
        <option value="type">Type</option>
      </select>
    </div>

    <AppButton
      v-if="selectedOption !== 'none'"
      variant="outline"
      size="md"
      :title="`Sort ${selectedDirection === 'asc' ? 'ascending' : 'descending'}`"
      @click="toggleDirection"
    >
      <Icon name="octicon:arrow-up-16" class="h-5 w-5" />
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppButton from '~/components/AppButton.vue';
import type { SortOption, SortDirection } from '~/composables/useJokes';

const props = defineProps({
  initialOption: {
    type: String as () => SortOption,
    default: 'none',
  },
  initialDirection: {
    type: String as () => SortDirection,
    default: 'asc',
  },
});

const emit = defineEmits<{
  (e: 'sortChange', option: SortOption, direction: SortDirection): void;
  (e: 'directionChange', direction: SortDirection): void;
}>();

const selectedOption = ref<SortOption>(props.initialOption);
const selectedDirection = ref<SortDirection>(props.initialDirection);

function emitSortChange() {
  emit('sortChange', selectedOption.value, selectedDirection.value);
}

function toggleDirection() {
  selectedDirection.value = selectedDirection.value === 'asc' ? 'desc' : 'asc';
  emit('directionChange', selectedDirection.value);
}

// Sync with parent when props change
watch(
  () => props.initialOption,
  (newValue) => {
    selectedOption.value = newValue;
  }
);

watch(
  () => props.initialDirection,
  (newValue) => {
    selectedDirection.value = newValue;
  }
);
</script>
