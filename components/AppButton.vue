<template>
  <button
    :class="[
      'inline-flex items-center justify-center transition-colors cursor-pointer',
      sizeClasses,
      variantClasses,
      roundedClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
    ]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    variant: 'primary',
    size: 'md',
    rounded: 'md',
    disabled: false,
    type: 'button',
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-1 py-1 text-sm';
    case 'lg':
      return 'px-3 py-3 text-lg';
    default:
      return 'px-2 py-2 text-base';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-500 hover:bg-primary-600 text-white';
    case 'secondary':
      return 'bg-secondary-500 hover:bg-secondary-600 text-white';
    case 'outline':
      return 'bg-transparent border border-current text-primary-500 hover:bg-primary-50';
    case 'ghost':
      return 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-current';
    case 'danger':
      return 'bg-danger-500 hover:bg-danger-600 text-white';
    default:
      return 'bg-primary-500 hover:bg-primary-600 text-white';
  }
});

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case 'none':
      return 'rounded-none';
    case 'sm':
      return 'rounded';
    case 'lg':
      return 'rounded-lg';
    case 'full':
      return 'rounded-full';
    default:
      return 'rounded-md';
  }
});
</script>
