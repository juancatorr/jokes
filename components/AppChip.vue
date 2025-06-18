<template>
  <div
    class="text-sm px-2 py-1 rounded-full inline-flex items-center justify-center"
    :class="[
      variant === 'default' ? 'text-text-on-secondary bg-secondary-400' : '',
      variant === 'primary' ? 'text-text-on-primary bg-primary-500' : '',
      variant === 'success' ? 'text-white bg-success-emphasis' : '',
      variant === 'danger' ? 'text-white bg-danger-emphasis' : '',
      variant === 'attention' ? 'text-text bg-attention-muted' : '',
      size === 'sm' ? 'text-xs' : '',
      size === 'md' ? 'text-sm' : '',
      size === 'lg' ? 'text-base' : '',
    ]"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'primary' | 'success' | 'danger' | 'attention';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    variant: 'default',
    size: 'md',
  }
);
</script>
