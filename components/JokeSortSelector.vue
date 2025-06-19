<template>
  <div class="flex items-center gap-4 min-w-[208px]">
    <AppSelector
      id="sort"
      label="Sort by"
      :options="sortOptions"
      :initial-value="selectedOption"
      @change="handleSortChange"
    >
      <template #append>
        <AppButton
          v-if="selectedOption !== 'none'"
          variant="outline"
          size="md"
          :title="`Sort ${selectedDirection === 'asc' ? 'ascending' : 'descending'}`"
          class="ml-4"
          @click="toggleDirection"
        >
          <Icon
            name="octicon:arrow-up-16"
            class="h-5 w-5 transition-transform duration-300"
            :class="{ 'rotate-180': selectedDirection === 'desc' }"
          />
        </AppButton>
      </template>
    </AppSelector>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppButton from '~/components/AppButton.vue';
import AppSelector from '~/components/AppSelector.vue';
import type { SelectOption } from '~/components/AppSelector.vue';
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

// Opciones de ordenamiento para el selector
const sortOptions = computed<SelectOption[]>(() => [
  { value: 'none', label: 'None' },
  { value: 'id', label: 'ID' },
  { value: 'setup', label: 'Setup' },
  { value: 'type', label: 'Type' },
]);

function handleSortChange(value: string) {
  selectedOption.value = value as SortOption;
  emit('sortChange', selectedOption.value, selectedDirection.value);
}

function toggleDirection() {
  selectedDirection.value = selectedDirection.value === 'asc' ? 'desc' : 'asc';
  emit('directionChange', selectedDirection.value);
}
</script>
